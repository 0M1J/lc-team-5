from enum import Enum
from typing import List, Optional, Literal
from datetime import datetime
from pydantic import BaseModel, EmailStr

def datetime_now_sec():
    return datetime.now().replace(microsecond=0)

class Role(str, Enum):
    Worker = "worker"
    Resident = "resident"
    MD = "md"
    SocialWorker = "social_worker"
    Nurse = "nurse"
    Therapist = "therapist"
    Other = "other"

class UserBase(BaseModel):
    email: EmailStr
    hashed_password: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: str
    created: datetime = datetime_now_sec()
    updated: datetime = datetime_now_sec()
    is_superuser: bool = False
    role: Role

    class Config:
        from_attributes = True
    
    @classmethod
    def from_dict(cls, d:dict):
        id = d.get('id')
        email = d.get('email')
        hashed_password = d.get('hashed_password')
        role = d.get('role')
        print(role)
        return cls(id=id, email=email, hashed_password=hashed_password, role=role)


class UserOut(BaseModel):
    id: str
    email: str
    role: Role

class UserIn(BaseModel):
    email: str
    password: str
    role: Role

class UserLoginIn(BaseModel):
    email: str
    password: str

class EmployeeInformation(BaseModel):
    model_type: Literal["EmployeeInformation"] = "EmployeeInformation"
    first_name: str = ""
    name: str = ""
    phone: str = ""

class Employee(User, EmployeeInformation):
    pass
    # manager_id: str

class ImmigrationStatus(str, Enum):
    Citizen = "Citizen"
    TemporaryResident = "Temporary resident"
    PermanentResident = "Permanent resident"
    AsylumSeekerReceived = "Asylum seeker (received)"
    AsylumSeekerInProgress = "Asylum seeker (in process)"
    NoStatus = "No status"

class CurrentAccommodation(str, Enum):
    ThreeDays = "3 days"


class BoroughsOfMontreal(str, Enum):
    Lachine = "Lachine"
    LaSalle = "LaSalle"
    Le_Plateau_Mont_Royal = "Le Plateau-Mont-Royal"
    Verdun = "Verdun"
    Ville_Marie = "Ville-Marie"

class ResidentInformation(BaseModel):
    model_type: Literal["ResidentInformation"] = "ResidentInformation"
    first_name: str = ""
    name: str = ""
    plan_start_date: datetime = datetime.now()
    start_date_of_stay: datetime = datetime.now()
    end_date_of_stay: datetime = datetime.now()
    current_accommodation: CurrentAccommodation = CurrentAccommodation.ThreeDays
    first_visit: bool = True
    immigration_status: ImmigrationStatus = ImmigrationStatus.Citizen
    autochthone: bool = False
    veteran: bool = False
    with_children: bool = False
    orientation_at_end_of_stay: List[str] = []
    challenges_issues: List[str] = []
    age: int = 0
    borough: List[BoroughsOfMontreal] = []
    monthly_income: int = 0
    assigned_caregivers: Optional[List[Employee]] = None

class Resident(User):
    role: Role = Role.Resident

class Worker(Employee):
    role: Role = Role.Worker

class ResidentExtended(Resident, ResidentInformation):
    pass

# TODO: models after this line are unused

# New Model for Significant Persons
class Relation(str, Enum):
    Family = "Family"
    Friend = "Friend"
    Colleague = "Colleague"
    Other = "Other"

class SignificantPerson(BaseModel):
    relation: Relation
    name: str
    phone: str
    email: EmailStr

class TreatmentTeamMember(BaseModel):
    role: Role
    name: str
    phone: str
    email: EmailStr
    address: str

# New Model for Community Service
class CommunityService(BaseModel):
    name: str
    contact: str
    phone: str
    email: EmailStr
    mission: str


# New Model for Goals
class Term(str, Enum):
    ShortTerm = "Short term"
    MediumTerm = "Medium term"
    LongTerm = "Long term"

class Status(str, Enum):
    Future = "Future"
    InProgress = "In progress"
    Paused = "Paused"
    Completed = "Completed"

class HealthAspect(str, Enum):
    Global = "Global"
    Mental = "Mental"
    Physical = "Physical"
    Social = "Social"
    Economic = "Economic"

class Goal(BaseModel):
    title: str
    description: str
    term: Term
    status: Status
    means: str
    health_aspects: List[HealthAspect]

# New Model for Follow Up
class FollowUpType(str, Enum):
    Appointment = "Appointment"
    Meeting = "Meeting"
    Checkpoint = "Checkpoint"

class CommunicationMethod(str, Enum):
    Email = "Email"
    Phone = "Phone"
    InPerson = "In person"

class FollowUp(BaseModel):
    title: str
    follow_up_date: datetime
    type: FollowUpType
    notes: str
    communication_method: CommunicationMethod

# New Model for Chronological Note
class NoteType(str, Enum):
    Meeting = "Meeting"
    Action = "Action"
    Other = "Other"

class FollowUpType(str, Enum):
    Meeting = "Meeting"
    Action = "Action"
    Other = "Other"

class ResourceType(str, Enum):
    Activity = "Activity"
    Video = "Video"
    Document = "Document"

class IssueType(str, Enum):
    RelatedIssue = "Related Issue"
    Challenge = "Challenge"
    Other = "Other"

class ChronologicalNote(BaseModel):
    title: str
    type: NoteType
    date: datetime
    details: str
    observations: str
    employee: str  # Assuming employee ID or name
    follow_up_type: Optional[FollowUpType] = None
    motive: Optional[str] = None
    intervention: Optional[str] = None  # Linked intervention ID or name
    goal: Optional[str] = None  # Linked goal ID or name

class Resource(BaseModel):
    title: str
    description: str
    type: ResourceType
    link: str

class Issue(BaseModel):
    type: IssueType
    description: str

class Intervention(BaseModel):
    title: str
    description: str
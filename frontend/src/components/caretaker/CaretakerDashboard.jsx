import React, { useState } from "react";
import ChatboxComponent from "../common/ChatboxComponent";
import InterventionList from "../common/InterventionList";
import interventions from "../../data/interventions";
import GoalList from "../common/GoalList";
import goalsData from "../../data/goals";
import ResourceList from "../common/ResourceList";
import resources from "../../data/resources";
import FollowUpList from "../common/FollowUpList";
import follow_ups from "../../data/followup";
import ChronologicalNotesList from "../common/ChronologicalNoteList";
import chronological_notes from "../../data/chronologicalNotes";
import DynamicForm from "./DynamicForm";

const TabBar = ({ activeTab, setActiveTab, setShowForm }) => {
  return (
    <div className="w-1/6 h-full border-r border-gray-300">
      <div className="flex flex-col justify-start items-center h-full">
        <div className="bg-gray-200 rounded-t-lg text-lg font-bold p-4 w-full mb-4">
          Caretaker's Name<br></br>
          Current Resident: Resident's Name<br></br>
          <button
            // onClick={}
            className={`rounded py-2 px-4 w-2/3 mb-4 mt-2 text-white bg-black text-sm`}
          >
            Change Resident
          </button>
        </div>

        <button
          onClick={() => {
            setActiveTab("follow-ups");
            setShowForm(false); // Close form when switching tabs
          }}
          className={`rounded py-2 px-4 w-2/3 mb-4 text-white ${
            activeTab === "follow-ups" ? "bg-blue-500" : "bg-gray-500"
          }`}
        >
          Follow Ups
        </button>
        <button
          onClick={() => {
            setActiveTab("resources");
            setShowForm(false); // Close form when switching tabs
          }}
          className={`rounded py-2 px-4 w-2/3 mb-4 text-white ${
            activeTab === "resources" ? "bg-blue-500" : "bg-gray-500"
          }`}
        >
          Resources
        </button>
        <button
          onClick={() => {
            setActiveTab("goals");
            setShowForm(false); // Close form when switching tabs
          }}
          className={`rounded py-2 px-4 w-2/3 mb-4 text-white ${
            activeTab === "goals" ? "bg-blue-500" : "bg-gray-500"
          }`}
        >
          Goals
        </button>
        <button
          onClick={() => {
            setActiveTab("intervention-plans");
            setShowForm(false); // Close form when switching tabs
          }}
          className={`rounded py-2 px-4 w-2/3 mb-4 text-white ${
            activeTab === "intervention-plans" ? "bg-blue-500" : "bg-gray-500"
          }`}
        >
          Interventions
        </button>
        <button
          onClick={() => {
            setActiveTab("chronological-notes");
            setShowForm(false); // Close form when switching tabs
          }}
          className={`rounded py-2 px-4 w-2/3 text-white ${
            activeTab === "chronological-notes" ? "bg-blue-500" : "bg-gray-500"
          }`}
        >
          Chronological Notes
        </button>
      </div>
    </div>
  );
};

const MainContent = ({ activeTab, showForm, setShowForm }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filterContent = (contentList) => {
    return contentList.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };
  const [formData, setFormData] = useState({
    title: "",
    follow_up_date: "",
    type: "",
    notes: "",
    communication_method: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, you can send formData to backend or perform any other action here
    console.log(formData);
    // Close the form after submission
    setShowForm(false);
  };

  const formInputs = {
    "follow-ups": [
      { label: "Title", name: "title", type: "text" },
      { label: "Follow-up Date", name: "follow_up_date", type: "date" },
      { label: "Type", name: "type", type: "text" },
      { label: "Notes", name: "notes", type: "text" },
      { label: "Communication Method", name: "communication_method", type: "text" },
    ],
    // Define form inputs for other tabs similarly
  };

  let content = null;
  let field = {};

  if (activeTab === "follow-ups") {
    field = [{ name: "title", label: "Title", type: "text" },
    { name: "date", label: "Date", type: "date" },
    { 
      name: "type", 
      label: "Follow-Up Type", 
      type: "radio", 
      options: [
        { value: "Appointment", label: "Appointment" },
        { value: "Meeting", label: "Meeting" },
        { value: "Checkpoint", label: "Checkpoint" }
      ]
    },
    { name: "notes", label: "Notes", type: "textarea" },
    { 
      name: "communicationMethod", 
      label: "Communication Method", 
      type: "radio", 
      options: [
        { value: "Email", label: "Email" },
        { value: "Phone", label: "Phone" },
        { value: "In person", label: "In person" }
      ]
    }
];
    const filteredFollowUps = filterContent(follow_ups.follow_ups);
    content = <FollowUpList followUps={filteredFollowUps} userType={"0"} />;
  } else if (activeTab === "resources") {
    field = [{ name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { 
      name: "type", 
      label: "Resource Type", 
      type: "radio", 
      options: [
        { value: "Activity", label: "Activity" },
        { value: "Video", label: "Video" },
        { value: "Document", label: "Document" }
      ]
    },
    { name: "link", label: "Link", type: "url" ,name:"url" ,id:"url", placeholder:"https://" },
    { 
      name: "Issues", 
      label: "Issues", 
      type: "radio", 
      options: [
        { value: "Related issues", label: "Related issues" },
        { value: "challenges", label: "challenges" },
      ]
    }
];
    const filteredResources = filterContent(resources.resources);
    content = <ResourceList resources={filteredResources} userType={"0"} />;
  } else if (activeTab === "goals") {
    field = [{ name: "Goal title", label: "Goal title", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { 
      name: "Term", 
      label: "Term", 
      type: "radio", 
      options: [
        { value: "Short", label: "Short" },
        { value: "Medium", label: "Medium" },
        { value: " Long term", label: " Long term" }
      ]
    },
    { 
      name: "Status", 
      label: "Status", 
      type: "radio", 
      options: [
        { value: "Future", label: "Future" },
        { value: "In progress", label: "In progress" },
        { value: " Paused", label: " Paused" },
        { value: " Completed", label: " Completed" }
      ]
    },
    { name: "Means", label: "Means", type: "textarea" },
    { 
      name: "Health aspect(s)", 
      label: "Health aspect(s)", 
      type: "radio", 
      options: [
        { value: "Global", label: "Global" },
        { value: "Mental", label: "Mental" },
        { value: "Physical", label: "Physical" },
        { value: "Social", label: "Social" },
        { value: "Economic Health", label: "Economic Health" },
      ]
    }
];
    const filteredGoals = filterContent(goalsData.goals);
    content = <GoalList goals={filteredGoals} userType={"0"} />;
  } else if (activeTab === "intervention-plans") {

    field = [{ name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "text" },
];
    const filteredInterventions = filterContent(interventions.interventions);
    content = (
      <InterventionList
        interventions={filteredInterventions}
        userType={"0"}
      />
    );
  } else if (activeTab === "chronological-notes") {
    field = [{ name: "Title", label: "Title", type: "text" },
    { name: "date", label: "Date", type: "date" },
    { name: "Details", label: "Details", type: "textarea" },
    { name: "Details", label: "Observations", type: "textarea" },
    {
      name: "Employee",
      label: "Employee",
      type: "select",
      options: [
        { value: "Employee 1", label: "Employee 1" },
        { value: "Employee 2", label: "Employee 2" },
        { value: "Employee 3", label: "Employee 3" },
      ],
    },
    { 
      name: "Type of follow up", 
      label: "Type of follow up", 
      type: "radio", 
      options: [
        { value: "Meeting", label: "Meeting" },
        { value: "Action", label: "Action" },
        { value: " Apointment", label: " Apointment" }
      ]
    },
    { name: "Motive", label: "Motive", type: "text" },
    { name: "Intervention link", label: "Intervention link", type: "url" ,name:"url" ,id:"url", placeholder:"https://intervention/:id" },
    { name: "Goal link", label: "Goal link", type: "url" ,name:"url" ,id:"url", placeholder:"https://goal/:id" }
];
    const filteredChronologicalNotes = filterContent(chronological_notes.chronological_notes);
    content = (
      <ChronologicalNotesList
        chronologicalNotes={filteredChronologicalNotes}
        userType={"0"}
      ></ChronologicalNotesList>
    );
  }

  return (
    <div className="w-3/6 border-r border-l border-gray-300">
      <div className="flex justify-center items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type here..."
          className="w-2/3 p-2 border border-gray-300 mr-2 mt-3"
        />
        <button type="button" className="p-2 bg-gray-200 rounded ml-2 mt-3">
          Search
        </button>
      </div>

      <div className="text-right">
        <button 
          onClick={() => setShowForm(!showForm)} // Toggle form visibility
          className="bg-blue-500 text-white py-2 px-4 mx-2 rounded mr-20 mt-5"
        >
          Add New
        </button>
      </div>
      {showForm && <DynamicForm onSubmit={handleSubmit} fields={field}/>}
      {content}
    </div>
  );
};

const ChatSection = () => {
  return (
    <div className="w-2/6 h-full">
      <div className="h-full bg-gray-100 flex justify-center items-center">
        <ChatboxComponent userId={"sample_user_sebastian"}></ChatboxComponent>
      </div>
    </div>
  );
};

const CaretakerDashboard = () => {
  const [activeTab, setActiveTab] = useState("follow-ups");
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex h-screen">
      <TabBar setActiveTab={setActiveTab} activeTab={activeTab} setShowForm={setShowForm} />
      <MainContent activeTab={activeTab} showForm={showForm} setShowForm={setShowForm} />
      <ChatSection />
    </div>
  );
};

export default CaretakerDashboard;


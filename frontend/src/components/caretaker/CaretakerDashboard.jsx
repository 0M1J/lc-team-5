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

  if (activeTab === "follow-ups") {
    content = <FollowUpList followUps={follow_ups.follow_ups} userType={"0"} />;
  } else if (activeTab === "resources") {
    content = <ResourceList resources={resources.resources} userType={"0"} />;
  } else if (activeTab === "goals") {
    content = <GoalList goals={goalsData.goals} userType={"0"} />;
  } else if (activeTab === "intervention-plans") {
    content = (
      <InterventionList
        interventions={interventions.interventions}
        userType={"0"}
      />
    );
  } else if (activeTab === "chronological-notes") {
    content = (
      <ChronologicalNotesList
        chronologicalNotes={chronological_notes.chronological_notes}
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
          className="bg-blue-500 text-white py-2 px-4 mx-2 rounded"
        >
          Add New
        </button>
      </div>
      {showForm && (
          <form onSubmit={handleSubmit} className="w-full p-6">
            {/* Dynamically render input fields based on activeTab */}
            {formInputs[activeTab].map((input, index) => (
              <div key={index} className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">{input.label}</label>
                <input
                  type={input.type}
                  name={input.name}
                  value={formData[input.name]}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            ))}
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Submit
            </button>
          </form>
        )}
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


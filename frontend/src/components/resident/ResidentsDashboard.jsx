import React, { useState } from "react";
import GoalList from "../common/GoalList";
import goalsData from "../../data/goals";
import ResourceList from "../common/ResourceList";
import resources from "../../data/resources";
import follow_ups from "../../data/followup";
import FollowUpList from "../common/FollowUpList";
import InterventionList from "../common/InterventionList";
import interventions from "../../data/interventions";
import ChatboxComponent from "../common/ChatboxComponent";

const TabBar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-1/6 h-full border-r border-gray-300">
      <div className="flex flex-col justify-start items-center h-full">
        <div className="bg-gray-200 rounded-t-lg text-lg font-bold p-4 w-full mb-4">
          Resident's Name
        </div>
        {activeTab === "follow-ups" ? (
          <button
            onClick={() => setActiveTab("follow-ups")}
            className={`rounded py-2 px-4 w-2/3 mb-4 text-white bg-blue-500`}
          >
            Follow Ups
          </button>
        ) : (
          <button
            onClick={() => setActiveTab("follow-ups")}
            className={`rounded py-2 px-4 w-2/3 mb-4 text-white bg-gray-500`}
          >
            Follow Ups
          </button>
        )}
        <button
          onClick={() => setActiveTab("resources")}
          className={`rounded py-2 px-4 w-2/3 mb-4 text-white ${
            activeTab === "resources" ? "bg-blue-500" : "bg-gray-500"
          }`}
        >
          Resources
        </button>
        <button
          onClick={() => setActiveTab("goals")}
          className={`rounded py-2 px-4 w-2/3 mb-4 text-white ${
            activeTab === "goals" ? "bg-blue-500" : "bg-gray-500"
          }`}
        >
          Goals
        </button>
        <button
          onClick={() => setActiveTab("intervention-plans")}
          className={`rounded py-2 px-4 w-2/3 text-white ${
            activeTab === "intervention-plans" ? "bg-blue-500" : "bg-gray-500"
          }`}
        >
          Interventions
        </button>
      </div>
    </div>
  );
};

const MainContent = ({ activeTab }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filterContent = (contentList) => {
    return contentList.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  let content = null;

  if (activeTab === "follow-ups") {
    const filteredFollowUps = filterContent(follow_ups.follow_ups);
    content = <FollowUpList followUps={filteredFollowUps} userType={"1"} />;
  } else if (activeTab === "resources") {
    const filteredResources = filterContent(resources.resources);
    content = <ResourceList resources={filteredResources} userType={"1"} />;
  } else if (activeTab === "goals") {
    const filteredGoals = filterContent(goalsData.goals);
    content = <GoalList goals={filteredGoals} userType={"1"} />;
  } else if (activeTab === "intervention-plans") {
    const filteredInterventions = filterContent(interventions.interventions);
    content = (
      <InterventionList
        interventions={filteredInterventions}
        userType={"1"}
      />
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
      {content}
    </div>
  );
};

const ChatSection = () => {
  return (
    <div className="w-2/6 h-full">
      <div className="h-full bg-gray-100 flex justify-center items-center">
        <ChatboxComponent userId={"sample_user_alice"}></ChatboxComponent>
      </div>
    </div>
  );
};

const ResidentsDashboard = () => {
  const [activeTab, setActiveTab] = useState("follow-ups");

  return (
    <div className="flex h-screen">
      <TabBar setActiveTab={setActiveTab} activeTab={activeTab} />
      <MainContent activeTab={activeTab} />
      <ChatSection />
    </div>
  );
};

export default ResidentsDashboard;

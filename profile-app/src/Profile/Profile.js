import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Profile() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const handleFileUpload = (event, type) => {
    const files = Array.from(event.target.files).map((file) => file.name);
    if (type === "project") {
      setProjects((prev) => [...prev, ...files]);
    } else if (type === "task") {
      setTasks((prev) => [...prev, ...files]);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="grid grid-cols-3 gap-6">
        {/* Projects Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Projects:</h2>
          <ul className="mb-4">
            {projects.map((project, index) => (
              <li key={index} className="text-gray-600">
                {project}
              </li>
            ))}
          </ul>
          <label className="w-full bg-gray-200 text-gray-600 py-2 rounded-md hover:bg-gray-300 text-center cursor-pointer">
            Create project +
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFileUpload(e, "project")}
            />
          </label>
        </div>

        {/* Tasks Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Tasks:</h2>
          <ul className="mb-4">
            {tasks.map((task, index) => (
              <li key={index} className="text-gray-600">
                {task}
              </li>
            ))}
          </ul>
          <label className="w-full bg-gray-200 text-gray-600 py-2 rounded-md hover:bg-gray-300 text-center cursor-pointer">
            Create task +
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFileUpload(e, "task")}
            />
          </label>
        </div>

        {/* Edit Profile Button */}
        <div className="bg-white p-6 rounded-lg shadow col-span-2">
          <h2 className="text-xl font-semibold mb-4">Profile Details:</h2>
          <p className="mb-4">
            Edit your profile details by clicking the button below.
          </p>
          <Link
            to="/edit-profile"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 text-center block"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

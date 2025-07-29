import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserPersonaForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    productivityType: "",
    workStyle: "",
    tools: [],
    goals: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        tools: checked
          ? [...prev.tools, value]
          : prev.tools.filter((tool) => tool !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Persona:", formData);
    localStorage.setItem("userPersona", JSON.stringify(formData));
    alert("Persona saved! 🚀 Now your twin knows you.");
    // Redirect to dashboard after successful setup
    navigate('/dashboard');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-2xl font-bold">Setup Your Digital Twin</h2>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <select
        name="productivityType"
        value={formData.productivityType}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Productivity Type</option>
        <option value="early_bird">Early Bird</option>
        <option value="night_owl">Night Owl</option>
        <option value="balanced">Balanced</option>
      </select>

      <select
        name="workStyle"
        value={formData.workStyle}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Work Style</option>
        <option value="solo">Solo</option>
        <option value="team">Team</option>
        <option value="hybrid">Hybrid</option>
      </select>

      <fieldset className="space-y-2">
        <legend className="font-semibold">Tools You Use:</legend>
        {["Notion", "Google Calendar", "Trello", "Slack"].map((tool) => (
          <label key={tool} className="block">
            <input
              type="checkbox"
              name="tools"
              value={tool}
              onChange={handleChange}
              checked={formData.tools.includes(tool)}
              className="mr-2"
            />
            {tool}
          </label>
        ))}
      </fieldset>

      <textarea
        name="goals"
        placeholder="What are your short/long term goals?"
        value={formData.goals}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        rows="4"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Persona
      </button>
    </form>
  );
}

export default UserPersonaForm;

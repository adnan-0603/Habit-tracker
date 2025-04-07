import { useState } from "react";

function AddHabitForm({ onAdd }) {
  const [habitInput, setHabitInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!habitInput.trim()) return;
    onAdd(habitInput); // pass the habit to App
    setHabitInput(""); // clear the input
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <input
        type="text"
        value={habitInput}
        onChange={(e) => setHabitInput(e.target.value)}
        placeholder="Enter a habit (e.g., Read 20min)"
        className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </form>
  );
}

export default AddHabitForm;

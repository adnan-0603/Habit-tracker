import { useState, useEffect } from "react";
import Header from "./components/Header";
import AddHabitForm from "./components/AddHabitForm";
import HabitList from "./components/HabitList";
import StreakCard from "./components/StreakCard";
import AnalyticsChart from "./components/AnalyticsChart";

function App() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  const addHabit = (newHabit) => {
    if (!newHabit.trim()) return;

    const newHabitObj = {
      name: newHabit,
      completed: false,
    };

    setHabits([...habits, newHabitObj]);
  };

  const toggleHabit = (index) => {
    const updatedHabits = [...habits];
    updatedHabits[index].completed = !updatedHabits[index].completed;
    setHabits(updatedHabits);
  };

  const deleteHabit = (index) => {
    const updatedHabits = habits.filter((_, i) => i !== index);
    setHabits(updatedHabits);
  };

  // ✅ Save to localStorage whenever habits change
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Header />
        <AddHabitForm onAdd={addHabit} />
        <HabitList habits={habits} onToggle={toggleHabit} onDelete={deleteHabit} />
        <StreakCard />
        <AnalyticsChart />
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import Header from "./components/Header";
import AddHabitForm from "./components/AddHabitForm";
import HabitList from "./components/HabitList";
import StreakCard from "./components/StreakCard";
import AnalyticsChart from "./components/AnalyticsChart";

function App() {
  // ✅ Load habits from localStorage on startup
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Add new habit
  const addHabit = (newHabit) => {
    if (!newHabit.trim()) return;
  
    const newHabitObj = {
      name: newHabit,
      completed: false,
      streak: 0,
      lastCompleted: null,
    };
  
    setHabits([...habits, newHabitObj]);
  };

  // ✅ Toggle completion of habit
  const toggleHabit = (index) => {
    const updatedHabits = [...habits];
    const habit = updatedHabits[index];
  
    // Toggle the completed value
    habit.completed = !habit.completed;
  
    // If marking as completed, set today's date as lastCompleted
    if (habit.completed) {
      habit.lastCompleted = new Date().toISOString().slice(0, 10); // e.g., "2025-04-07"
    }
  
    setHabits(updatedHabits);
  };

  // ✅ Delete a habit
  const deleteHabit = (index) => {
    const updatedHabits = habits.filter((_, i) => i !== index);
    setHabits(updatedHabits);
  };

  // ✅ DAILY RESET + STREAK LOGIC
useEffect(() => {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const lastUpdated = localStorage.getItem("lastUpdated");

  if (lastUpdated !== today) {
    const updatedHabits = habits.map(habit => {
      let newStreak = habit.streak;

      // 🔁 If it was completed yesterday, continue streak
      if (habit.lastCompleted === yesterday) {
        newStreak += 1;
      } 
      // ❌ If missed, reset streak
      else if (habit.lastCompleted !== today) {
        newStreak = 0;
      }

      return {
        ...habit,
        completed: false,
        streak: newStreak,
      };
    });

    setHabits(updatedHabits);
    localStorage.setItem("lastUpdated", today);
  }
}, []);


  // ✅ Sync habits to localStorage every time they change
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

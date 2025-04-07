function HabitList({ habits, onToggle, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
      <h2 className="text-xl font-semibold mb-2">Your Habits:</h2>
      {habits.length === 0 ? (
        <p className="text-gray-500 italic">No habits yet. Add one!</p>
      ) : (
        <ul className="space-y-2">
          {habits.map((habit, index) => (
            <li
              key={index}
              className="flex justify-between items-center gap-4 bg-gray-50 dark:bg-gray-700 p-2 rounded"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={habit.completed}
                  onChange={() => onToggle(index)}
                  className="w-4 h-4"
                />
                <span
                  className={`${
                    habit.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {habit.name}
                </span>

                {/* 🔥 Show Streak Counter */}
                <span className="text-sm text-indigo-500 ml-2">
                  🔥 {habit.streak} day{habit.streak !== 1 ? "s" : ""}
                </span>
              </div>

              <button
                onClick={() => onDelete(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HabitList;

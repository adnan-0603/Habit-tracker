function Header() {
    return (
      <header className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
          🔥 Habit Tracker
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">
          Stay consistent. Track daily progress.
        </p>
      </header>
    );
  }
  
  export default Header;
  
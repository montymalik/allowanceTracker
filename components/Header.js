export default function Header({ onDashboardClick, onSettingsClick }) {
  return (
    <header className="bg-blue-600 p-6 shadow-lg text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Allowance Tracker</h1>
        <nav className="space-x-4">
          <button 
          onClick={onDashboardClick}
	  className="bg-white text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition duration-200">
            Spending
          </button>
	  <button
	  onClick={onSettingsClick}
	  className="bg-white text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition duration-200">
            Admin
          </button>
        </nav>
      </div>
    </header>
  );
}


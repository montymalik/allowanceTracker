export default function Header() {
  return (
    <header className="bg-blue-600 p-6 shadow-lg text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Allowance Tracker</h1>
        <nav className="space-x-4">
          <button className="bg-white text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition duration-200">
            Dashboard
          </button>
          <button className="bg-white text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition duration-200">
            Settings
          </button>
        </nav>
      </div>
    </header>
  );
}


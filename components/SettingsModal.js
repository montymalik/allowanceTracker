// components/SettingsModal.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SettingsModal({ onClose, onSave, currentValues }) {
  const router = useRouter();

  // State for initial authentication to access settings
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  // State for the settings form values
  const [values, setValues] = useState({
    videoGames: '',
    generalSpending: '',
    charity: '',
    savings: ''
  });

  // State for displaying the reset confirmation
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetPassword, setResetPassword] = useState('');

  // Update form fields when currentValues change
  useEffect(() => {
    if (currentValues) {
      setValues({
        videoGames: currentValues.videoGames,
        generalSpending: currentValues.generalSpending,
        charity: currentValues.charity,
        savings: currentValues.savings
      });
    }
  }, [currentValues]);

  // Authenticate to access settings
  const handleAuthenticate = () => {
    if (password === "admin123") {
      setAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  // Handle changes in the settings form
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Save updated settings via the onSave callback
  const handleSave = async () => {
    await onSave(values);
    onClose();
  };

  // Handle reset confirmation (when Reset button is pressed)
  const handleResetConfirm = async () => {
    if (resetPassword !== "admin123") {
      alert("Incorrect password for reset.");
      return;
    }
    try {
      const res = await fetch('/api/resetBalance', { method: 'POST' });
      if (res.ok) {
        alert("Database reset successfully.");
        // Reload the page so that both the dashboard and the graph show zeros
        router.reload();
      } else {
        alert("Reset failed.");
      }
    } catch (error) {
      console.error("Error resetting database:", error);
      alert("An error occurred while resetting the database.");
    }
  };

  // If the reset confirmation is active, render that pop-up
  if (showResetConfirm) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Reset Database</h2>
          <p className="mb-4 text-red-600 font-semibold">
            Are you sure? This action can't be undone.
          </p>
          <input 
            type="password"
            value={resetPassword}
            onChange={(e) => setResetPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter password"
          />
          <div className="flex justify-end">
            <button 
              onClick={() => setShowResetConfirm(false)} 
              className="mr-4 px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button 
              onClick={handleResetConfirm} 
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, render the normal settings modal
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
        {!authenticated ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Enter Password</h2>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Password"
            />
            <div className="flex justify-end">
              <button onClick={onClose} className="mr-4 px-4 py-2 border rounded">
                Cancel
              </button>
              <button onClick={handleAuthenticate} className="px-4 py-2 bg-blue-600 text-white rounded">
                Authenticate
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Video Games</label>
                <input 
                  type="number" 
                  name="videoGames" 
                  value={values.videoGames} 
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">General Spending</label>
                <input 
                  type="number" 
                  name="generalSpending" 
                  value={values.generalSpending} 
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Charity</label>
                <input 
                  type="number" 
                  name="charity" 
                  value={values.charity} 
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Savings</label>
                <input 
                  type="number" 
                  name="savings" 
                  value={values.savings} 
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <button 
                onClick={() => setShowResetConfirm(true)} 
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Reset Database
              </button>
              <div className="flex space-x-4">
                <button onClick={onClose} className="px-4 py-2 border rounded">
                  Cancel
                </button>
                <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded">
                  Save
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


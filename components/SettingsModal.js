// components/SettingsModal.js
import { useState, useEffect } from 'react';

export default function SettingsModal({ onClose, onSave, currentValues }) {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [values, setValues] = useState({
    videoGames: '',
    generalSpending: '',
    charity: '',
    savings: ''
  });

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

  const handleAuthenticate = () => {
    // For demonstration purposes, the password is hard-coded
    if (password === "admin123") {
      setAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await onSave(values);
    onClose();
  };

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
            <div className="mt-6 flex justify-end">
              <button onClick={onClose} className="mr-4 px-4 py-2 border rounded">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded">
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


// pages/index.js
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import DepositForm from '../components/DepositForm';
import WithdrawForm from '../components/WithdrawForm';
import MonthlyFlowChart from '../components/MonthlyFlowChart';
import SettingsModal from '../components/SettingsModal';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [showMonthlyFlow, setShowMonthlyFlow] = useState(false);
  const [monthlyData, setMonthlyData] = useState([]);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Fetch balance from the API and update the state.
  const fetchBalance = async () => {
    try {
      const res = await fetch('/api/balance');
      if (res.ok) {
        const data = await res.json();
        setCategories([
          { name: 'Video Games', amount: data.videoGames },
          { name: 'General Spending', amount: data.generalSpending },
          { name: 'Charity', amount: data.charity },
          { name: 'Savings', amount: data.savings },
        ]);
      } else {
        console.error('Error fetching balance');
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };
  // Fetch the monthly inflow/outflow aggregated data
  const fetchMonthlyFlow = async () => {
    try {
      const res = await fetch('/api/monthlyFlow');
      if (res.ok) {
        const data = await res.json();
        setMonthlyData(data);
      } else {
        console.error('Error fetching monthly flow data');
      }
    } catch (error) {
      console.error('Error fetching monthly flow data:', error);
    }
  };

  // Fetch balance when the component mounts.
  useEffect(() => {
    fetchBalance();
  }, []);
  
  // Toggle view to show monthly graph
  const toggleMonthlyFlow = () => {
    // When switching to the graph view, fetch the monthly data
    if (!showMonthlyFlow) {
      fetchMonthlyFlow();
    }
    setShowMonthlyFlow((prev) => !prev);
  };

  // When a deposit is made, call the /api/deposit endpoint.
  const handleDeposit = async (depositAmount) => {
    try {
      const res = await fetch('/api/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(depositAmount) }),
      });
      if (res.ok) {
        await fetchBalance();
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Deposit failed');
      }
    } catch (error) {
      console.error('Error processing deposit:', error);
    }
  };

  // When a withdrawal is made, call the /api/withdraw endpoint.
  const handleWithdrawal = async ({ videoGamesAmount, generalSpendingAmount }) => {
    try {
      const res = await fetch('/api/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoGames: parseFloat(videoGamesAmount) || 0,
          generalSpending: parseFloat(generalSpendingAmount) || 0,
        }),
      });
      if (res.ok) {
        await fetchBalance();
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Withdrawal failed');
      }
    } catch (error) {
      console.error('Error processing withdrawal:', error);
    }
  };
  

 // Handle saving updated balance values from the Settings modal
  const handleUpdateBalance = async (newValues) => {
    try {
      const res = await fetch('/api/updateBalance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoGames: parseFloat(newValues.videoGames),
          generalSpending: parseFloat(newValues.generalSpending),
          charity: parseFloat(newValues.charity),
          savings: parseFloat(newValues.savings),
        }),
      });
      if (res.ok) {
        await fetchBalance();
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Update failed');
      }
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
	  onDashboardClick={toggleMonthlyFlow}
	  onSettingsClick={() => setShowSettingsModal(true)}
	  />
      <main>
	  {showSettingsModal && (
          <SettingsModal
            currentValues={{
              videoGames: categories.find(cat => cat.name === 'Video Games')?.amount || 0,
              generalSpending: categories.find(cat => cat.name === 'General Spending')?.amount || 0,
              charity: categories.find(cat => cat.name === 'Charity')?.amount || 0,
              savings: categories.find(cat => cat.name === 'Savings')?.amount || 0,
            }}
            onClose={() => setShowSettingsModal(false)}
            onSave={handleUpdateBalance}
          />
        )}
	  {showMonthlyFlow ? (
          <div className="container mx-auto px-4 py-8">
		  {/* Home button added here */}
            <button
              onClick={() => setShowMonthlyFlow(false)}
              className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Home
            </button>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Monthly Inflows and Outflows</h2>
            <MonthlyFlowChart monthlyData={monthlyData} />
		  </div>
        ) : (
          <>
            <Dashboard categories={categories} />
            <div className="container mx-auto px-4 py-8">
              <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">Deposit Money</h2>
              <DepositForm onDeposit={handleDeposit} />
            </div>
            <div className="container mx-auto px-4 py-8">
              <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">Withdraw Money</h2>
              <WithdrawForm onWithdraw={handleWithdrawal} />
            </div>
          </>
        )}
      </main>
    </div>
  );

}


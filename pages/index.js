// pages/index.js
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import DepositForm from '../components/DepositForm';
import WithdrawForm from '../components/WithdrawForm';
import CombinedChart from '../components/CombinedChart';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [showGraph, setShowGraph] = useState(false);

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

  // Fetch balance when the component mounts.
  useEffect(() => {
    fetchBalance();
  }, []);

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
  // Toggle between graph view and standard view.
  const toggleGraph = () => {
    setShowGraph((prev) => !prev);
  };

  // Extract category values for the graph.
  const videoGames = categories.find((cat) => cat.name === 'Video Games')?.amount || 0;
  const generalSpending = categories.find((cat) => cat.name === 'General Spending')?.amount || 0;
  const charity = categories.find((cat) => cat.name === 'Charity')?.amount || 0;
  const savings = categories.find((cat) => cat.name === 'Savings')?.amount || 0;


  return (
    <div className="min-h-screen bg-gray-50">
      <Header onDashboardClick={toggleGraph}/>
      <main>
	  {showGraph ? (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Dashboard Graph</h2>
            <CombinedChart
              videoGames={videoGames}
              generalSpending={generalSpending}
              charity={charity}
              savings={savings}
            />
          </div>
        ) : (
          <>
            <Dashboard categories={categories} />
            <div className="container mx-auto px-4 py-8">
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">Deposit Money</h2>
              <DepositForm onDeposit={handleDeposit} />
            </div>
            <div className="container mx-auto px-4 py-8">
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">Withdraw Money</h2>
              <WithdrawForm onWithdraw={handleWithdrawal} />
            </div>
          </>
        )}
      </main>
    </div>
  );

}


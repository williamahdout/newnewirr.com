import React, { useState } from 'react';

function App() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [beginBalance, setBeginBalance] = useState('');
  const [endBalance, setEndBalance] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateIRR = (startDate, endDate, beginBalance, endBalance) => {
    // Convert dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate time period in years
    const timeDiffInDays = (end - start) / (1000 * 60 * 60 * 24);
    const timePeriodInYears = timeDiffInDays / 365;

    // Calculate IRR using the formula: (FV/PV)^(1/t) - 1
    // where FV = future value (end balance)
    // PV = present value (begin balance)
    // t = time in years
    const irr = Math.pow(endBalance / beginBalance, 1 / timePeriodInYears) - 1;
    return irr * 100; // Convert to percentage
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    // Input validation
    if (!startDate || !endDate || !beginBalance || !endBalance) {
      setError('Please fill in all fields');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      setError('End date must be after start date');
      return;
    }

    if (parseFloat(beginBalance.replace(/,/g, '')) <= 0 || parseFloat(endBalance.replace(/,/g, '')) <= 0) {
      setError('Balances must be positive numbers');
      return;
    }

    try {
      const irrResult = calculateIRR(
        startDate,
        endDate,
        parseFloat(beginBalance.replace(/,/g, '')),
        parseFloat(endBalance.replace(/,/g, ''))
      );
      setResult(irrResult);
    } catch (err) {
      setError('Error calculating IRR. Please check your inputs.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
          IRR Calculator
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="beginBalance" className="block text-sm font-medium text-gray-700">
              Beginning Balance
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                id="beginBalance"
                value={beginBalance}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9.]/g, '');
                  if (value === '' || (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)) {
                    setBeginBalance(value);
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value) {
                    const num = parseFloat(e.target.value);
                    setBeginBalance(num.toLocaleString('en-US'));
                  }
                }}
                className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="endBalance" className="block text-sm font-medium text-gray-700">
              Ending Balance
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                id="endBalance"
                value={endBalance}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9.]/g, '');
                  if (value === '' || (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)) {
                    setEndBalance(value);
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value) {
                    const num = parseFloat(e.target.value);
                    setEndBalance(num.toLocaleString('en-US'));
                  }
                }}
                className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Calculate IRR
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {result !== null && !error && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            The Internal Rate of Return (IRR) is: {result.toFixed(2)}% <br />
            Based on initial investment of ${parseFloat(beginBalance.replace(/,/g, '')).toLocaleString('en-US')} and final value of ${parseFloat(endBalance.replace(/,/g, '')).toLocaleString('en-US')}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
import React from 'react';

const FinanceView: React.FC = () => {
  return (
    <div className="p-8 animate-[fadeIn_0.3s_ease]">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-primary">Financial Overview</h2>
        <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">2023</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-md">Export PDF</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
             <div className="text-xs font-bold text-gray-400 uppercase">Gross Revenue</div>
             <div className="text-3xl font-bold text-gray-900 mt-2">€1,245,000</div>
             <div className="text-xs text-green-600 mt-1">↑ 12% vs last year</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
             <div className="text-xs font-bold text-gray-400 uppercase">Operating Expenses</div>
             <div className="text-3xl font-bold text-gray-900 mt-2">€342,000</div>
             <div className="text-xs text-red-600 mt-1">↑ 5% due to maintenance</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
             <div className="text-xs font-bold text-gray-400 uppercase">Net Income</div>
             <div className="text-3xl font-bold text-blue-600 mt-2">€903,000</div>
             <div className="text-xs text-green-600 mt-1">Healthy margin</div>
          </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                      <th className="px-6 py-4 font-semibold text-gray-600">Category</th>
                      <th className="px-6 py-4 font-semibold text-gray-600">Date</th>
                      <th className="px-6 py-4 font-semibold text-gray-600">Reference</th>
                      <th className="px-6 py-4 font-semibold text-gray-600 text-right">Amount</th>
                      <th className="px-6 py-4 font-semibold text-gray-600 text-center">Status</th>
                  </tr>
              </thead>
              <tbody>
                  {[
                      { cat: 'Rent Collection', date: 'Oct 24, 2023', ref: '#INV-001', amount: '+€2,400', status: 'Cleared' },
                      { cat: 'Maintenance', date: 'Oct 23, 2023', ref: '#JOB-293', amount: '-€450', status: 'Pending' },
                      { cat: 'Insurance', date: 'Oct 20, 2023', ref: '#INS-992', amount: '-€1,200', status: 'Cleared' },
                      { cat: 'Rent Collection', date: 'Oct 19, 2023', ref: '#INV-002', amount: '+€1,800', status: 'Cleared' },
                      { cat: 'Utility Bill', date: 'Oct 15, 2023', ref: '#UTIL-11', amount: '-€320', status: 'Cleared' },
                  ].map((row, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">{row.cat}</td>
                          <td className="px-6 py-4 text-gray-500">{row.date}</td>
                          <td className="px-6 py-4 text-gray-500">{row.ref}</td>
                          <td className={`px-6 py-4 font-bold text-right ${row.amount.startsWith('+') ? 'text-green-600' : 'text-gray-900'}`}>{row.amount}</td>
                          <td className="px-6 py-4 text-center">
                              <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold ${row.status === 'Cleared' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                  {row.status}
                              </span>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
};

export default FinanceView;
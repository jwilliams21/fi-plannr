import { useState } from 'react';
import { FiPieChart } from './FiPieChart';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export default function BasicDashboard({ results }) {
  const [scheduleOpen, setScheduleOpen] = useState(false)

  if(!results) {
    return (
      <div className='mt-10'></div>
    )
  }

  const totalEndingBalance = parseFloat(results[results.length-1].yearEndingBalance) || 0;
  const startingAmount = parseFloat(results[0].yearStartingAmt) || 0;

  const totalInterest = results.reduce((accumulator, currentYear) => {
    return accumulator + (parseFloat(currentYear.yearInterest) || 0);
  }, 0)

  const totalContribution = results.reduce((accumulator, currentYear) => {
    return accumulator + (parseFloat(currentYear.yearAddContribute) || 0);
  }, 0)

  function toggleSchedule() {
    setScheduleOpen(!scheduleOpen);
  }
  
  return (
    <div className='w-full p-4'>

      {/* Top Line Results */}
      <table className='w-full table-fixed border-separate border-spacing-y-2'>
        <thead>
          <tr>
            <th colSpan={2} className='bg-emerald-500 text-white text-lg p-1'>Results</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='py-1 font-bold'>End Balance</td>
            <td className='text-center text-md font-bold  text-white bg-sky-700 rounded-sm py-1'>$ {totalEndingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          </tr>
          <tr>
            <td className='py-1'>Total Interest</td>
            <td className='text-center py-1'>$ {totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          </tr>
          <tr>
            <td className='py-1'>Total Contributions</td>
            <td className='text-center py-1'>$ {totalContribution.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          </tr>
          <tr>
            <td className='py-1'>Starting Amount</td>
            <td className='text-center py-1'>$ {startingAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          </tr>
        </tbody>
      </table>

      {/* Doughnut Chart */}
      <div className='my-4 p-4 text-center border-2 border-blue-500 mx-2'>
        <h2>Growth Projections</h2>
        <FiPieChart 
          results={results}
        />
      </div>

      {/* Accumulation Table */}
      <table className='w-full table-fixed border-separate border-spacing-y-1 text-center'>
        <thead >
          <tr>
            <th 
            colSpan={4} 
            className='bg-emerald-500 text-white text-lg'
            onClick={() => toggleSchedule()}
            >
              <div className='flex items-center justify-evenly p-1'>
                <span>Accumulation Schedule</span>
                {scheduleOpen ? <ArrowUpCircle /> : <ArrowDownCircle />}
              </div>
            </th>
          </tr>
        </thead>
        {scheduleOpen &&
        <tbody>
          <tr>
            <th className='font-semibold text-md'>Year</th>
            <th className='font-semibold text-md'>Deposit</th>
            <th className='font-semibold text-md'>Interest</th>
            <th className='font-semibold text-md'>Balance</th>
          </tr>
          {results.map((row) => {
            return (
              <tr key={row.year}>
                <td className='text-sm'>{row.year}</td>
                <td className='text-sm'>$ {row.yearAddContribute.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className='text-sm'>$ {row.yearInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className='text-sm'>$ {row.yearEndingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            )
          })}
        </tbody>
        }

      </table>

    </div>
  )
}
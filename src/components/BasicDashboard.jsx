import { useState, useRef } from 'react';
import { FiPieChart } from './FiPieChart';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export default function BasicDashboard({ results }) {
  const [scheduleOpen, setScheduleOpen] = useState(false)

  const tableRef = useRef(null);

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

  const scheduleGridLayout = 'grid grid-cols-[40px_1fr_1fr_1fr] gap-4 items-center'

  function toggleSchedule() {
    setScheduleOpen(!scheduleOpen);
  }

  const handleToggle = () => {
    if(!scheduleOpen) {
      toggleSchedule();
      setTimeout(() => {
      window.scrollBy({
        top: 250,
        behavior: 'smooth'
      }, 50)
      })
    } else {
      toggleSchedule();
    }
  }
  
  return (
    <div className='w-full px-6'>

      <div>
        <div className='w-full bg-emerald-500 text-white text-lg p-1 text-center font-bold mb-2 md:p-2'>Results</div>
        <div className='grid grid-cols-2 gap-2 md:px-12 md:text-center'>
          <div className='py-1 font-bold'>End Balance</div>
          <div className='text-center text-md font-bold  text-white bg-sky-700 rounded-sm py-1 md:mx-16 lg:mx-36'>$ {totalEndingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div className='py-1'>Total Interest</div>
          <div className='text-center py-1'>$ {totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div className='py-1'>Total Contributions</div>
          <div className='text-center py-1'>$ {totalContribution.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div className='py-1'>Starting Amount</div>
          <div className='text-center py-1'>$ {startingAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
      </div>


      {/* Doughnut Chart */}
      <div className='my-2'>
        <h2 className='text-white text-lg bg-emerald-500 font-bold text-center py-1 md:p-2'>Growth Projections</h2>
        <FiPieChart 
          results={results}
        />
      </div>

      <div className='w-full overflow-x-auto'>
        <div 
        className='flex items-center justify-center gap-2 p-1 text-lg bg-emerald-500 text-white font-bold md:p-2'
        onClick={() => handleToggle()}
        >
          <span>Accumulation Schedule</span>
          {scheduleOpen ? <ArrowUpCircle /> : <ArrowDownCircle />}
        </div>
        {scheduleOpen && 
          <div ref={tableRef} className='text-sm scroll-mt-2'>
            {/* Table Header */}
            <div className={`${scheduleGridLayout} bg-slate-100 py-3 px-4 font-bold text-slate-700 rounded-t-lg border-b border-slate-200`}>
              <div className='text-center'>Year</div>
              <div className='text-center'>Deposit</div>
              <div className='text-center'>Interest</div>
              <div className='text-center'>Balance</div>
            </div>
            {/* Table Body */}
            <div className='divide-y divide-slate-100 border-x border-b border-slate-200 rounded-b-lg'>
            {results.map((row) => {
              return (
                <div key={row.year} className={`${scheduleGridLayout} py-3 px-4`}>
                  <div className='text-center font-bold'>{row.year}</div>
                  <div className='text-center'>${row.yearAddContribute.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div className='text-center text-emerald-600'>${row.yearInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div className='text-center'>${row.yearEndingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
              )})}
            </div>
          </div>
        }
      </div>

      {/* Accumulation Table */}
      {/* <table className='w-full table-fixed border-separate border-spacing-y-1 text-center'>
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

      </table> */}

    </div>
  )
}
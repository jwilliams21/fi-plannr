import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='bg-slate-50 text-slate-950 flex flex-col gap-6 align-center justify-center px-4 mt-2'>

      <div>
        <h1 className='text-xl font-semibold pb-2'>Welcome to Fi-PlannR</h1>
        <p>Your centralized workspace for tracking compound growth and mapping your path to early retirement.</p>
      </div>

      <div>
        <p className='font-semibold pb-2'>Disclaimer</p>
        <p>
          This tool is built entirely for educational and entertainment purposes. We love compounding interest, but we aren't certified financial planners or fiduciary advisors. 
          None of the calculations or data visualizations generated constitute formal financial advice.  None of the data entered is saved or stored.  Happy calculating!
        </p>
      </div>

      <div>
        <p className='font-bold text-white bg-emerald-500 shadow-lg text-center text-xl p-2 rounded-lg'>Click one of the Calc links above to get started!</p>
      </div>

    </div>
  )
}
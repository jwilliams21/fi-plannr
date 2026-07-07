import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='text-slate-950 flex flex-col justify-between px-6 pb-8 h-[calc(100vh-137px)] md:px-36'>

      <div className='space-y-4 pt-6'>
        <div className='md:text-center md:flex md:flex-col md:gap-2'>
          <h1 className='text-xl font-semibold pb-2'>Welcome to Fi-PlannR</h1>
          <p className='md:text-lg'>Your centralized workspace for tracking compound growth and mapping your path to early retirement.</p>
        </div>

        <div className='md:text-center lg:px-52'>
          <p className='font-semibold pb-2 md:text-xl'>Disclaimer</p>
          <p className='md:text-lg'>
            This tool is built entirely for educational and entertainment purposes. We love compounding interest, but we aren't certified financial planners or fiduciary advisors. 
            None of the calculations or data visualizations generated constitute formal financial advice.  None of the data entered is saved or stored.  Happy calculating!
          </p>
        </div>
      </div>

      <div className='flex justify-center'>
        <Link to='/basic' className='font-bold text-white bg-emerald-500 shadow-lg text-center text-xl p-4 rounded-lg'>
          Click Here For Basic Calc!
        </Link>
      </div>

    </div>
  )
}
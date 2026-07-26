import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='text-slate-950 flex flex-col gap-10 pb-8 px-4 h-[calc(100dvh-137px)]'>

      <div className='space-y-4 pt-6'>
        <div className='w-full md:text-center md:flex md:flex-col md:w-5/8 md:mx-auto'>
          <h1 className='text-xl font-semibold pb-2'>Welcome to Fi-PlannR</h1>
          <p className='md:text-lg'>Your centralized workspace for tracking compound growth and mapping your path to early retirement.</p>
        </div>

        <div className='w-full md:text-center md:w-5/8 md:mx-auto lg:mt-8'>
          <p className='font-semibold pb-2 md:text-xl'>Disclaimer</p>
          <p className='md:text-lg'>
            This tool is built entirely for educational and entertainment purposes. We love compounding interest, but we aren't certified financial planners or fiduciary advisors. 
            None of the calculations or data visualizations generated constitute formal financial advice.  None of the data entered is saved or stored.  Happy calculating!
          </p>
        </div>
      </div>

      <div className='md:w-5/8 md:mx-auto grid grid-cols-2 gap-4 md:gap-0'>
        <div className='flex justify-center'>
          <Link to='/basic' className='font-bold text-white bg-emerald-600 shadow-lg text-center text-lg p-4 rounded-lg'>
            Invest Calc
          </Link>
        </div>

        <div className='flex justify-center'>
          <Link 
          to='/fire' 
          className='font-bold text-white shadow-xl text-center text-lg p-4 rounded-lg bg-linear-to-r from-amber-300 via-orange-500 to-red-700'>
            FIRE Calc
          </Link>
        </div>
      </div>


    </div>
  )
}
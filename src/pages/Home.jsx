import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='text-slate-950 flex flex-col gap-10 pb-8 px-4 h-[calc(100dvh-137px)]'>

      <div className='space-y-4 pt-6'>
        <div className='w-full md:text-center md:flex md:flex-col md:w-5/8 md:mx-auto xl:w-1/2'>
          <h1 className='text-xl font-semibold pb-2'>Welcome to Fi-Plann<span className='text-emerald-700'>R</span></h1>
          <p className='md:text-lg'>An interactive space for tracking compound growth, running FIRE scenarios, and seeing how fast your money can work for you.</p>
        </div>

        <div className='w-full md:text-center md:w-5/8 md:mx-auto lg:mt-8 xl:w-1/2'>
          <p className='font-semibold pb-2 md:text-xl'>Disclaimer</p>
          <p className='md:text-lg'>
            Fi-PlannR is an educational tool built to help you explore financial independence—not formal financial advice! We aren't CFPs or fiduciaries, 
            just huge fans of compounding returns. Note that our FIRE Calculator models projections using a 3% annual inflation rate for expenses and a 
            4% safe withdrawal rate. Zero data entered is saved, stored, or tracked. Enjoy running the numbers!
          </p>
        </div>
      </div>

      <div className='md:w-5/8 xl:w-3/8 md:mx-auto grid grid-cols-2 gap-4 md:gap-0'>
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
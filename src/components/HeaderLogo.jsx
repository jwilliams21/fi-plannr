import { TrendingUp } from 'lucide-react';

export default function HeaderLogo() {
    return (
        <div className='flex gap-2 justify-center items-center p-2 text-2xl lg:text-5xl'>
            <div className='bg-emerald-600 text-white p-2 rounded-lg shadow-sm'>
                <TrendingUp className='w-8 h-8 lg:w-12 lg:h-12' />
            </div>
            <div className='font-bold'>
                <span>FI-Plann</span><span className='text-emerald-600'>R</span>
            </div>
        </div>
    )
}
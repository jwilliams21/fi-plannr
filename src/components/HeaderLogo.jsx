import { TrendingUp } from 'lucide-react';

export default function HeaderLogo() {
    return (
        <div className='flex gap-2 justify-center items-center p-2'>
            <div className='bg-emerald-500 text-white p-2 rounded-lg shadow-sm'>
                <TrendingUp  />
            </div>
            <div className='font-bold'>
                <span>FI-Plann</span><span className='text-emerald-600'>R</span>
            </div>
        </div>
    )
}
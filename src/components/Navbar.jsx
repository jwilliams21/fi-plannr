import { NavLink, Link } from 'react-router-dom';
import HeaderLogo from './HeaderLogo';

export default function Navbar() {
    return(
        <header className='text-slate-950 py-2'>
            <div>
                <NavLink to='/'end>
                    <HeaderLogo />
                </NavLink>
                <nav className='flex justify-evenly mt-6 font-semibold text-xl'>
                    <NavLink 
                        to='/basic' 
                        className={({ isActive }) => 
                            `text-xl border-b-2 transition-all pb-2
                            ${ isActive ? 'border-b-4 border-emerald-600' : 'border-transparent' }
                            `
                        }>Basic Calc
                    </NavLink>
                    <NavLink 
                        to='/fire' 
                        className={({ isActive }) => 
                            `text-xl border-b-2 transition-all pb-2 
                            ${ isActive ? 'border-b-4 border-emerald-600' : 'border-transparent' }
                            `
                        }>
                        <span 
                        className='bg-linear-to-r from-amber-300 via-orange-500 to-red-700 bg-clip-text text-transparent font-extrabold'
                        style={{ filter: 'drop-shadow(-0.1px 0.1px 0px rgba(0,0,0,0.2))'}}
                        >FIRE Calc</span>
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}
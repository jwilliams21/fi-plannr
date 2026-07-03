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
                            ${ isActive ? 'border-b-4 border-emerald-500' : 'border-transparent' }
                            `
                        }>Basic Calc
                    </NavLink>
                    <NavLink 
                        to='/fire' 
                        className={({ isActive }) => 
                            `text-xl border-b-2 transition-all pb-2
                            ${ isActive ? 'border-b-4 border-emerald-500' : 'border-transparent' }
                            `
                        }>FIRE Calc
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}
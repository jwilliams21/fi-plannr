import { Link, Outlet } from 'react-router-dom';
import HeaderLogo from './HeaderLogo';

export default function Layout() {
    return (
        <div>

            <header>
                <div>
                    <Link to='/'>
                        <HeaderLogo />
                    </Link>
                    <nav>
                        <Link to='/'>Home</Link>
                        <Link to='/basic'>Basic Calc</Link>
                        <Link to='/fire'>FIRE Calc</Link>
                    </nav>
                </div>
            </header>

            <main>
                <Outlet />
            </main>

        </div>
    )
}
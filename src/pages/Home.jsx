import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>

      <div>
        <h1>Welcome to Fi-PlannR</h1>
        <p>Your centralized workspace for tracking compound growth and mapping your path to early retirement.</p>
      </div>

      <div>
        <p>Disclaimer</p>
        <p>
          This tool is built entirely for educational and entertainment purposes. We love compounding interest, but we aren't certified financial planners or fiduciary advisors. 
          None of the calculations or data visualizations generated constitute formal financial advice.  Happy calculating!
        </p>
      </div>

      <div>
        <Link to='/basic'>
          <h3>Basic Investment Calculator</h3>
          <p>Description</p>
        </Link>
        <Link to='/fire'>
          <h3>FIRE Calculator</h3>
          <p>Description</p>
        </Link>
      </div>

    </div>
  )
}
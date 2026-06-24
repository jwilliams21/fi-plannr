import { useState } from 'react';
import FireCalculatorForm from '../components/FireCalculatorForm';
import FireDashboard from '../components/FireDashboard';

export default function FireCalculator() {
    const [fireResults, setFireResults] = useState(null);

    return (
        <div>
            <h2>FIRE Investment Calculator</h2>
            <FireCalculatorForm onCalculated={setFireResults} />
            <FireDashboard results={fireResults} />
        </div>
    )
}
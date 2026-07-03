import { useState } from 'react';
import FireCalculatorForm from '../components/FireCalculatorForm';
import FireDashboard from '../components/FireDashboard';

export default function FireCalculator() {
    const [fireResults, setFireResults] = useState(null);

    return (
        <div>
            <FireCalculatorForm onCalculated={setFireResults} />
            <FireDashboard results={fireResults} />
        </div>
    )
}
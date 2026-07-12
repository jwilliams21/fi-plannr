import { useState } from 'react';
import FireCalculatorForm from '../components/FireCalculatorForm';
import FireDashboard from '../components/FireDashboard';

export default function FireCalculator() {
    const [fireResults, setFireResults] = useState(null);

    return (
        <div className='flex flex-col gap-8 mb-12 md:px-24 lg:px-56'>
            <FireCalculatorForm onCalculated={setFireResults} />
            <FireDashboard results={fireResults} />
        </div>
    )
}
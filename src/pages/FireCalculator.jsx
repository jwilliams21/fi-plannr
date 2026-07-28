import { useState } from 'react';
import FireCalculatorForm from '../components/FireCalculatorForm';
import FireDashboard from '../components/FireDashboard';

export default function FireCalculator() {
    const [fireResults, setFireResults] = useState(null);

    const handleCalculated = (results) => {
        setFireResults(results);
        setTimeout(() => {
            window.scrollBy({
                top: 450,
                behavior: 'smooth'
            })
        }, 50)
    };

    return (
        <div className='flex flex-col gap-12 mb-12'>
            <FireCalculatorForm onCalculated={handleCalculated} />
            <FireDashboard results={fireResults} />
        </div>
    )
}
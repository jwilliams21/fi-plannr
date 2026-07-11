import { useState } from 'react';
import BasicCalculatorForm from "../components/BasicCalculatorForm";
import BasicDashboard from "../components/BasicDashboard";

export default function BasicCalculator() {
    const [basicResults, setBasicResults] = useState(null);

    const handleCalculated = (results) => {
        setBasicResults(results);
        setTimeout(() => {
            window.scrollBy({
                top: 450,
                behavior: 'smooth'
            })
        }, 50)
    };


    return (
        <div className='flex flex-col gap-2 lg:px-28'>
            <BasicCalculatorForm onCalculated={handleCalculated} />
            <BasicDashboard results={basicResults} />
        </div>
    )
}
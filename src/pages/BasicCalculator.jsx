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
        <div className='flex flex-col gap-8 md:px-24 lg:px-56'>
            <BasicCalculatorForm onCalculated={handleCalculated} />
            <BasicDashboard results={basicResults} />
        </div>
    )
}
import { useState } from 'react';
import BasicCalculatorForm from "../components/BasicCalculatorForm";
import BasicDashboard from "../components/BasicDashboard";

export default function BasicCalculator() {
    const [basicResults, setBasicResults] = useState(null);

    return (
        <div className='flex flex-col gap-2'>
            <BasicCalculatorForm onCalculated={setBasicResults} />
            <BasicDashboard results={basicResults} />
        </div>
    )
}
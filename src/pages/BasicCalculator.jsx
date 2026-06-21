import { useState } from 'react';
import BasicCalculatorForm from "../components/BasicCalculatorForm";
import BasicDashboard from "../components/BasicDashboard";

export default function BasicCalculator() {
    const [basicResults, setBasicResults] = useState(null);

    console.log(basicResults)

    return (
        <div>
            <h2>Basic Investment Calculator</h2>
            <div>
                <BasicCalculatorForm onCalculated={setBasicResults} />
                <BasicDashboard results={basicResults} />
            </div>
        </div>
    )
}
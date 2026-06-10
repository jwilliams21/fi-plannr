import { useState } from 'react';
import BasicCalculatorForm from "../components/BasicCalculatorForm";
import BasicDashboard from "../components/BasicDashboard";

export default function BasicCalculator() {
    const [calculationResults, setCalculationResults] = useState(null);

    return (
        <div>
            <h2>Basic Investment Calculator</h2>
            <div>
                <BasicCalculatorForm onCalculated={setCalculationResults} />
                <BasicDashboard results={calculationResults} />
            </div>
        </div>
    )
}
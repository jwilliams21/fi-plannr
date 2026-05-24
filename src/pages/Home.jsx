import { useState } from 'react';
import { FiCalculatorForm, FiDashboard } from '../components';

export default function Home() {
  const [calculationResults, setCalculationResults] = useState(null);

  return (
    <>
      <FiCalculatorForm onCalculated={setCalculationResults} />
      <FiDashboard results={calculationResults}/>
    </>
  )
}
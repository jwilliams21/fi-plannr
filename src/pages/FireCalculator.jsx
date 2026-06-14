import FireCalculatorForm from '../components/FireCalculatorForm';
import FireDashboard from '../components/FireDashboard';

export default function FireCalculator() {
    return (
        <div>
            <h2>FIRE Investment Calculator</h2>
            <FireCalculatorForm />
            <FireDashboard />
        </div>
    )
}
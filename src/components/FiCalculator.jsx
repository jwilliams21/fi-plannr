import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fiSchema } from '../features/fi-calculator/fiSchema';
import { fiMath } from '../features/fi-calculator/utils/fiMath';
import FiInputs from './FiInputs';
import { Button } from './ui/Button'; 


export default function FiCalculator() {

    return (
        <form>
            <FiInputs />
            <Button
                variant='base'
            >
                Calculate
            </Button>
        </form>
    )
}
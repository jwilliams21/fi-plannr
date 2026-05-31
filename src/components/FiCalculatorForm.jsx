import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fiSchema } from '../features/fi-calculator/fiSchema';
import { fiMath } from '../features/fi-calculator/utils/fiMath';
import FiInputs from './FiInputs';
import { Button } from './ui/Button'; 


export default function FiCalculatorForm({ onCalculated }) {
    const [calcFrequency, setCalcFrequency] = useState('annual');
    const [calcTiming, setCalcTiming] = useState('beginning')
    

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: zodResolver(fiSchema)
    });

    const onSubmit = (data) => {
        const results = fiMath(data);
        onCalculated(results);
    }

    return (
        <form className='flex flex-col gap-4 p-6 w-full' onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <FiInputs 
                register={register} 
                errors={errors} 
                frequency={calcFrequency} 
                onFrequencyChange={setCalcFrequency}
                timing={calcTiming}
                onTimingChange={setCalcTiming}
            />
            <Button
                variant='base'
                type='submit'
            >Calculate Success</Button>
        </form>
    )
};
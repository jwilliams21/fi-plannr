import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fiSchema } from '../features/fi-calculator/fiSchema';
import { fiMath } from '../features/fi-calculator/utils/fiMath';
import FiInputs from './FiInputs';
import { Button } from './ui/Button'; 


export default function FiCalculatorForm() {
    const [calculationResults, setCalculationResults] = useState(null);

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: zodResolver(fiSchema)
    });

    console.log(errors)

    const onSubmit = (data) => {
        const results = fiMath(data);
        setCalculationResults(results);
    }

    return (
        <form className='flex flex-col gap-4 p-6 w-full' onSubmit={handleSubmit(onSubmit)}>
            <FiInputs register={register} errors={errors} />
            <Button
                variant='base'
                type='submit'
            >Calculate Success</Button>
        </form>
    )
};
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fiSchema } from '../features/fi-calculator/fiSchema';
import { fiMath } from '../features/fi-calculator/utils/fiMath';
import FireInputs from './FireInputs';
import { Button } from './ui/Button';

export default function FireCalculatorForm() {

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: zodResolver(fiSchema)
    });

    const onSubmit = (data) => {
        const results = fiMath(data);
        onCalculated(results);
    }

    return (
        <form className='flex flex-col gap-4 p-6 w-full' onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <FireInputs 
                register={register} 
                errors={errors} 
            />
            <Button
                variant='fire'
                type='submit'
            >Calculate FIRE Success</Button>
        </form>
    )
}
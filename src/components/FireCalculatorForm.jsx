import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fireSchema } from '../features/fi-calculator/fireSchema';
import { fireMath } from '../features/fi-calculator/utils/fireMath';
import FireInputs from './FireInputs';
import { Button } from './ui/Button';

export default function FireCalculatorForm({ onCalculated }) {

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: zodResolver(fireSchema),
        shouldUnregister: false,
    });

    const onSubmit = (data) => {
        const defaultData = fireSchema.parse({});
        const mergedData = { ...defaultData, ...data }

        const results = fireMath(mergedData);
        onCalculated(results);
    }

    return (
        <form className='flex flex-col items-center w-full mx-auto md:w-7/8' onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <FireInputs 
                register={register} 
                errors={errors} 
            />
            <Button
                variant='fireCalc'
                type='submit'
            >Calculate FIRE Success</Button>
        </form>
    )
}
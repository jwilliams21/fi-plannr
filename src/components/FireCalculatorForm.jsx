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
        defaultValues:{
            currentAge: 30,
            fireAge: 55,
            currentAnnualExpenses: 0,
            totalBrokerage: 0,
            brokerageContribution: 0,
            brokerageReturnRate: 0,
            totalRoth: 0,
            rothContribution: 0,
            rothReturnRate: 0,
            totalTraditional: 0,
            tradtionalContribution: 0,
            traditionalEmployerContribution: 0,
            tradtionalReturnRate: 0,
            totalHsa: 0,
            hsaContributions: 0,
            hsaReturnRate: 0,
        }
    });

    const onSubmit = (data) => {
        const results = fireMath(data);
        onCalculated(results);
    }

    return (
        <form className='flex flex-col items-center w-full' onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <FireInputs 
                register={register} 
                errors={errors} 
            />
            <Button
                variant='calc'
                type='submit'
            >Calculate FIRE Success</Button>
        </form>
    )
}
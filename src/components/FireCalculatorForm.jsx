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
        // defaultValues: {
        //     currentAge: 54,
        //     fireAge: 55,
        //     currentAnnualExpenses: 60000,
        //     totalBrokerage: 10000,
        //     brokerageContribution: 100,
        //     brokerageReturnRate: 8,
        //     totalRoth: 7500,
        //     rothContribution: 625,
        //     rothReturnRate: 8,
        //     totalTraditional: 35000,
        //     tradtionalContribution: 500,
        //     traditionalEmployerContribution: 300,
        //     tradtionalReturnRate: 8,
        //     totalHsa: 5000,
        //     hsaContributions: 366.66,
        //     hsaReturnRate: 8
        // }
    });

    const onSubmit = (data) => {
        const results = fireMath(data);
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
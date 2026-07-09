import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { basicSchema } from '../features/fi-calculator/basicSchema';
import { basicMath } from '../features/fi-calculator/utils/basicMath';
import BasicInputs from './BasicInputs';
import { Button } from './ui/Button'; 


export default function BasicCalculatorForm({ onCalculated }) {
    const [contributionTiming, setContributionTiming] = useState('beginning');
    const [contributionFrequency, setContributionFrequency] = useState('monthly');
    

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: zodResolver(basicSchema),
        defaultValues: {
            startingAmt: 10000,
            duration: 30,
            returnRate: 8,
            addContribute: 0
        }
    });

    const onSubmit = (data) => {
        data.contributionTiming = contributionTiming;
        data.contributionFrequency = contributionFrequency;

        const results = basicMath(data);
        onCalculated(results);
    }

    return (
        <form className='flex flex-col gap-4 px-6 w-full md:border-2 md:border-amber-600 md:px-32 lg:border-2 lg:border-violet-700 lg:px-56' onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
            <BasicInputs 
                register={register} 
                errors={errors} 
                contributionTiming={contributionTiming}
                onContributionTimingChange={setContributionTiming}
                contributionFrequency={contributionFrequency}
                onContributionFrequencyChange={setContributionFrequency}
            />
            <Button
                variant='base'
                type='submit'
            >Invest Me!</Button>
        </form>
    )
};
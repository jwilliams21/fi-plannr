import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { basicSchema } from '../features/fi-calculator/basicSchema';
import { basicMath } from '../features/fi-calculator/utils/basicMath';
import BasicInputs from './BasicInputs';
import { Button } from './ui/Button'; 


export default function BasicCalculatorForm({ onCalculated }) {
    const [compoundFrequency, setCompoundFrequency] = useState('annual');
    const [contributionTiming, setContributionTiming] = useState('beginning');
    const [contributionFrequency, setContributionFrequency] = useState('monthly');
    

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: zodResolver(basicSchema)
    });

    const onSubmit = (data) => {
        data.compoundFrequency = compoundFrequency;
        data.contributionTiming = contributionTiming;
        data.contributionFrequency = contributionFrequency;

        const results = basicMath(data);
        onCalculated(results);
    }

    return (
        <form className='flex flex-col gap-4 px-6 w-full' onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <BasicInputs 
                register={register} 
                errors={errors} 
                compoundFrequency={compoundFrequency} 
                onCompoundFrequencyChange={setCompoundFrequency}
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
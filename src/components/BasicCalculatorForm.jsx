import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fiSchema } from '../features/fi-calculator/fiSchema';
import { fiMath } from '../features/fi-calculator/utils/fiMath';
import BasicInputs from './BasicInputs';
import { Button } from './ui/Button'; 


export default function BasicCalculatorForm({ onCalculated }) {
    const [compoundFrequency, setCompoundFrequency] = useState('annual');
    const [contributionTiming, setContributionTiming] = useState('beginning');
    const [contributionFrequency, setContributionFrequency] = useState('monthly');
    

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: zodResolver(fiSchema)
    });

    const onSubmit = (data) => {
        data.compoundFrequency = compoundFrequency;
        data.contributionTiming = contributionTiming;
        data.contributionFrequency = contributionFrequency;

        const results = fiMath(data);
        onCalculated(results);
    }

    return (
        <form className='flex flex-col gap-4 p-6 w-full' onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
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
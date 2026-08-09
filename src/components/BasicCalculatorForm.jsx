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
        shouldUnregister: false,
    });

    const onSubmit = (data) => {
        const completedData = {
            ...data,
            contributionTiming,
            contributionFrequency
        }

        const results = basicMath(completedData);
        onCalculated(results);
    }

    return (
        <form 
        className='flex flex-col items-center w-full' 
        onSubmit={handleSubmit(onSubmit)} 
        autoComplete='off' 
        noValidate>
            <BasicInputs 
                register={register} 
                errors={errors} 
                contributionTiming={contributionTiming}
                onContributionTimingChange={setContributionTiming}
                contributionFrequency={contributionFrequency}
                onContributionFrequencyChange={setContributionFrequency}
            />
            <Button
                variant='calc'
                type='submit'
            >Invest</Button>
        </form>
    )
};
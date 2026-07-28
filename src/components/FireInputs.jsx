import { useState } from 'react';
import { InputField } from './ui/InputField';
import { Button } from './ui/Button';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export default function FireInputs({register, errors}) {
    const [brokerageOpen, setBrokerageOpen] = useState(true);
    const [rothOpen, setRothOpen] = useState(true);
    const [traditionalOpen, setTraditionalOpen] = useState(true);
    const [hsaOpen, setHsaOpen] = useState(true);

    function toggleBrokerage() {
        setBrokerageOpen(!brokerageOpen);
    }

    function toggleRoth() {
        setRothOpen(!rothOpen);
    }

    function toggleTraditional() {
        setTraditionalOpen(!traditionalOpen);
    }

    function toggleHsa() {
        setHsaOpen(!hsaOpen);
    }

    return (
        <div className='p-6 w-full flex flex-col'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3 '>
                <InputField 
                    id='currentAge'
                    name='currentAge'
                    registration={register('currentAge', { valueAsNumber: true })}
                    label='Current Age'
                    type='number'
                    labelVariant='base'
                    labelInfoVariant='base'
                    inputVariant='base'
                    divClassName='flex flex-col'
                    placeholder='25'
                    error={errors.currentAge?.message}
                    description='What is the age of the oldest member of your household?'
                />

                <InputField 
                    id='fireAge'
                    name='fireAge'
                    registration={register('fireAge', { valueAsNumber: true })}
                    label='FIRE Age'
                    type='number'
                    labelVariant='base'
                    labelInfoVariant='base'
                    inputVariant='base'
                    divClassName='flex flex-col'
                    placeholder='50'
                    error={errors.fireAge?.message}
                    description='What age does the oldest member of your household want to become financially free (no longer having to work to afford expenses and lifestyle)?'
                />

                <InputField 
                    id='currentAnnualExpenses'
                    name='currentAnnualExpenses'
                    registration={register('currentAnnualExpenses', { valueAsNumber: true })}
                    label='Annual Expenses'
                    type='number'
                    labelVariant='base'
                    labelInfoVariant='base'
                    inputVariant='base'
                    divClassName='flex flex-col'
                    placeholder='$ 60,000'
                    error={errors.currentAnnualExpenses?.message}
                    description='Add up everything you spend money on throughout the year (e.g., mortgage, car payments, take-out, lightsaber-dueling lessons, etc.).'
                />
            </div>

            <div className='flex flex-col gap-6 mt-6 md:mt-8 xl:grid xl:grid-cols-2'>
                <div className='flex flex-col gap-2'>
                    <div 
                    className='cursor-pointer flex gap-2 justify-center items-center text-lg font-bold border-2 border-emerald-600 bg-emerald-600 text-white text-center
                    py-1 lg:py-2 lg:grid lg:grid-cols-3'
                    onClick={() => toggleBrokerage()}>
                        <div></div>
                        <h2 className='text-center'>Brokerage Accounts</h2>
                        {brokerageOpen ? 
                        <div className='flex justify-left items-center'>
                            <ArrowDownCircle />
                        </div>
                        : 
                        <div className='flex justify-left items-center'>
                            <ArrowUpCircle />
                        </div>}
                    </div>
                    {brokerageOpen && 
                    <div className='flex flex-col gap-2 lg:grid lg:grid-cols-3 lg:gap-6'>
                        <InputField 
                            id='totalBrokerage'
                            name='totalBrokerage'
                            registration={register('totalBrokerage', { valueAsNumber: true })}
                            label='Balance'
                            type='number'
                            labelVariant='base'
                            labelInfoVariant='base'
                            inputVariant='base'
                            divClassName='flex flex-col'
                            placeholder='$ 50,000'
                            error={errors.totalBrokerage?.message}
                            description='This is invested money outside of your retirement accounts.'
                        />

                        <InputField 
                            id='brokerageContribution'
                            name='brokerageContribution'
                            registration={register('brokerageContribution', { valueAsNumber: true })}
                            label='Contribution'
                            type='number'
                            labelVariant='base'
                            labelInfoVariant='base'
                            inputVariant='base'
                            divClassName='flex flex-col'
                            placeholder='$ 200'
                            error={errors.brokerageContribution?.message}
                            description='How much do you put in all total brokerage accounts each month?'
                        />

                        <InputField 
                            id='brokerageReturnRate'
                            name='brokerageReturnRate'
                            registration={register('brokerageReturnRate', { valueAsNumber: true })}
                            label='Return Rate'
                            type='number'
                            labelVariant='base'
                            labelInfoVariant='base'
                            inputVariant='base'
                            divClassName='flex flex-col'
                            placeholder='8 %'
                            error={errors.brokerageReturnRate?.message}
                            description='What return rate are you expecting?  If you are not sure, try 8% to start.'
                        />
                    </div>}
                </div>

                <div className='flex flex-col gap-2'>
                    <div 
                    className='cursor-pointer flex gap-2 justify-center items-center text-lg font-bold border-2 border-emerald-600 bg-emerald-600 text-white text-center
                    py-1 lg:py-2 lg:grid lg:grid-cols-3'
                    onClick={() => toggleRoth()}>
                        <div></div>
                        <h2 className='text-center'>Roth Accounts</h2>
                        {rothOpen ? 
                        <div className='flex justify-left items-center'>
                            <ArrowDownCircle />
                        </div>
                        : 
                        <div className='flex justify-left items-center'>
                            <ArrowUpCircle />
                        </div>}
                    </div>
                    {rothOpen &&
                    <div className='flex flex-col gap-2 lg:grid lg:grid-cols-3 lg:gap-6'>
                        <InputField 
                            id='totalRoth'
                            name='totalRoth'
                            registration={register('totalRoth', { valueAsNumber: true })}
                            label='Balance'
                            type='number'
                            labelVariant='base'
                            labelInfoVariant='base'
                            inputVariant='base'
                            divClassName='flex flex-col'
                            placeholder='$ 20,000'
                            error={errors.totalRoth?.message}
                            description='The total value of all after-tax Roth accounts.'
                        />

                        <InputField 
                            id='rothContribution'
                            name='rothContribution'
                            registration={register('rothContribution', { valueAsNumber: true })}
                            label='Contribution'
                            type='number'
                            labelVariant='base'
                            labelInfoVariant='base'
                            inputVariant='base'
                            divClassName='flex flex-col'
                            placeholder='$ 625'
                            error={errors.rothContribution?.message}
                            description='How much do you put in all Roth accounts each month?'
                        />

                        <InputField 
                            id='rothReturnRate'
                            name='rothReturnRate'
                            registration={register('rothReturnRate', { valueAsNumber: true })}
                            label='Return Rate'
                            type='number'
                            labelVariant='base'
                            labelInfoVariant='base'
                            inputVariant='base'
                            divClassName='flex flex-col'
                            placeholder='8 %'
                            error={errors.rothReturnRate?.message}
                            description='What return rate are you expecting?  If you are not sure, try 8% to start.'
                        />
                    </div>}
                </div>

                <div className='flex flex-col gap-2'>
                    <div 
                    className='cursor-pointer gap-2 flex justify-center items-center text-lg font-bold border-2 border-emerald-600 bg-emerald-600 text-white text-center 
                    py-1 lg:py-2 lg:grid lg:grid-cols-3'
                    onClick={() => toggleTraditional()}>
                        <div></div>
                        <h2 className='text-center'>Traditional Accounts</h2>
                        {traditionalOpen ? 
                        <div className='flex justify-left items-center'>
                            <ArrowDownCircle />
                        </div>
                        : 
                        <div className='flex justify-left items-center'>
                            <ArrowUpCircle />
                        </div>}
                    </div>
                    {traditionalOpen &&
                    <div className='flex flex-col gap-2 lg:grid lg:grid-cols-3 lg:gap-6'>
                        <InputField 
                            id='totalTraditional'
                            name='totalTraditional'
                            registration={register('totalTraditional', { valueAsNumber: true })}
                            label='Balance'
                            type='number'
                            labelVariant='base'
                            labelInfoVariant='base'
                            inputVariant='base'
                            divClassName='flex flex-col'
                            placeholder='$ 50,000'
                            error={errors.totalTraditional?.message}
                            description='This is total traditional dollars (including Safe Harbor contributions) in all retirement accounts.'
                        />

                        <InputField 
                            id='traditionalContribution'
                            name='traditionalContribution'
                            registration={register('traditionalContribution', { valueAsNumber: true })}
                            label='Contribution'
                            type='number'
                            labelVariant='base'
                            labelInfoVariant='base'
                            inputVariant='base'
                            divClassName='flex flex-col'
                            placeholder='$ 500'
                            error={errors.traditionalContribution?.message}
                            description='How much do you put in all traditional accounts each month?'
                        />

                        <InputField 
                            id='traditionalEmployerContribution'
                            name='traditionalEmployerContribution'
                            registration={register('traditionalEmployerContribution', { valueAsNumber: true })}
                            label='Employer Contribution'
                            type='number'
                            labelVariant='base'
                            labelInfoVariant='base'
                            inputVariant='base'
                            divClassName='flex flex-col'
                            placeholder='$ 300'
                            error={errors.traditionalEmployerContribution?.message}
                            description='How much does your employer contribute to all traditional accounts each month?'
                        />

                        <InputField 
                            id='traditionalReturnRate'
                            name='traditionalReturnRate'
                            registration={register('traditionalReturnRate', { valueAsNumber: true })}
                            label='Return Rate'
                            type='number'
                            labelVariant='base'
                            labelInfoVariant='base'
                            inputVariant='base'
                            divClassName='flex flex-col'
                            placeholder='8 %'
                            error={errors.traditionalReturnRate?.message}
                            description='What return rate are you expecting?  If you are not sure, try 8% to start.'
                        />
                    </div>}
                </div>

                <div className='flex flex-col gap-2'>
                    <div 
                    className='cursor-pointer flex gap-2 justify-center items-center text-lg font-bold border-2 border-emerald-600 bg-emerald-600 text-white text-center
                    py-1 lg:py-2 lg:grid lg:grid-cols-3'
                    onClick={() => toggleHsa()}>
                        <div></div>
                        <h2 className='text-center'>HSA Accounts</h2>
                        {hsaOpen ? 
                        <div className='flex justify-left items-center'>
                            <ArrowDownCircle />
                        </div>
                        : 
                        <div className='flex justify-left items-center'>
                            <ArrowUpCircle />
                        </div>}
                    </div>
                    {hsaOpen &&
                    <div className='flex flex-col gap-2 lg:grid lg:grid-cols-3 lg:gap-6'>
                        <InputField 
                            id='totalHsa'
                            name='totalHsa'
                            registration={register('totalHsa', { valueAsNumber: true })}
                            label='Balance'
                            type='number'
                            labelVariant='base'
                            labelInfoVariant='base'
                            inputVariant='base'
                            divClassName='flex flex-col'
                            placeholder='$ 5,000'
                            error={errors.totalHsa?.message}
                            description='How much do you put in all HSA accounts each month?'
                        />


                        <InputField 
                            id='hsaContributions'
                            name='hsaContributions'
                            registration={register('hsaContributions', { valueAsNumber: true })}
                            label='Contributions'
                            type='number'
                            labelVariant='base'
                            labelInfoVariant='base'
                            inputVariant='base'
                            divClassName='flex flex-col'
                            placeholder='$ 200'
                            error={errors.hsaContributions?.message}
                            description='How much do you put in all HSA accounts each month?'
                        />

                        <InputField 
                            id='hsaReturnRate'
                            name='hsaReturnRate'
                            registration={register('hsaReturnRate', { valueAsNumber: true })}
                            label='Return Rate'
                            type='number'
                            labelVariant='base'
                            labelInfoVariant='base'
                            inputVariant='base'
                            divClassName='flex flex-col'
                            placeholder='8 %'
                            error={errors.hsaReturnRate?.message}
                            description='What return rate are you expecting?  If you are not sure, try 8% to start.'
                        />
                    </div>}
                </div>
            </div>
        </div>
    )
}


{/* <InputField 
        id='placeholder'
        name='placeholder'
        registration={register('placeholder')}
        label='placeholder'
        type='number'
        labelVariant='base'
        inputVariant='base'
        divClassName='flex flex-col'
        placeholder='placeholder'
        error={errors.placeholder?.message}
    /> */}
import { useState } from 'react';
import { InputField } from './ui/InputField';
import { Button } from './ui/Button';

export default function FireInputs({register, errors}) {
    const [brokerageOpen, setBrokerageOpen] = useState(false);
    const [rothOpen, setRothOpen] = useState(false);
    const [traditionalOpen, setTraditionalOpen] = useState(false);
    const [hsaOpen, setHsaOpen] = useState(false);

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
        <div className='p-6 w-full flex flex-col gap-4'>
            <InputField 
                id='currentAge'
                name='currentAge'
                registration={register('currentAge')}
                label='Current Age'
                type='number'
                labelVariant='base'
                inputVariant='base'
                divClassName='flex flex-col'
                placeholder='25'
                error={errors.currentAge?.message}
                description='What is the age of the oldest member of your household?'
            />

            <InputField 
                id='fireAge'
                name='fireAge'
                registration={register('fireAge')}
                label='FIRE Age'
                type='number'
                labelVariant='base'
                inputVariant='base'
                divClassName='flex flex-col'
                placeholder='50'
                error={errors.fireAge?.message}
                description='What age does the oldest member of your household want to become financially free (no longer having to work to afford expenses and lifestyle)?'
            />

            <InputField 
                id='currentAnnualExpenses'
                name='currentAnnualExpenses'
                registration={register('currentAnnualExpenses')}
                label='Current Annual Expenses'
                type='number'
                labelVariant='base'
                inputVariant='base'
                divClassName='flex flex-col'
                placeholder='$ 60,000'
                error={errors.currentAnnualExpenses?.message}
                description='Add up everything you spend money on throughout the year (e.g., mortgage, car payments, take-out, lightsaber-dueling lessons, etc.).'
            />

            <div>
                <div onClick={() => toggleBrokerage()}>
                    <h2>Brokerage Accounts</h2>
                </div>
                {brokerageOpen && 
                <div>
                    <InputField 
                        id='totalBrokerage'
                        name='totalBrokerage'
                        registration={register('totalBrokerage')}
                        label='Total Brokerage Balance'
                        type='number'
                        labelVariant='base'
                        inputVariant='base'
                        divClassName='flex flex-col'
                        placeholder='$ 50,000'
                        error={errors.totalBrokerage?.message}
                        description='This is invested money outside of your retirement accounts.'
                    />

                    <InputField 
                        id='brokerageContribution'
                        name='brokerageContribution'
                        registration={register('brokerageContribution')}
                        label='Brokerage Contribution'
                        type='number'
                        labelVariant='base'
                        inputVariant='base'
                        divClassName='flex flex-col'
                        placeholder='$ 200'
                        error={errors.brokerageContribution?.message}
                        description='How much do you put in all total brokerage accounts each month?'
                    />

                    <InputField 
                        id='brokerageReturnRate'
                        name='brokerageReturnRate'
                        registration={register('brokerageReturnRate')}
                        label='Brokerage Return Rate'
                        type='number'
                        labelVariant='base'
                        inputVariant='base'
                        divClassName='flex flex-col'
                        placeholder='10 %'
                        error={errors.brokerageReturnRate?.message}
                        description='What return rate are you expecting?  Typical annual rates vary between 6% - 12%.  Not sure?  Try 10% as a starting point.'
                    />
                </div>}
            </div>

            <div>
                <div onClick={() => toggleRoth()}>
                    <h2>Roth Accounts</h2>
                </div>
                {rothOpen &&
                <div>
                    <InputField 
                        id='totalRoth'
                        name='totalRoth'
                        registration={register('totalRoth')}
                        label='Total Roth Balance'
                        type='number'
                        labelVariant='base'
                        inputVariant='base'
                        divClassName='flex flex-col'
                        placeholder='$ 20,000'
                        error={errors.totalRoth?.message}
                        description='The total value of all after-tax Roth accounts.'
                    />

                    <InputField 
                        id='rothContribution'
                        name='rothContribution'
                        registration={register('rothContribution')}
                        label='Roth Contribution'
                        type='number'
                        labelVariant='base'
                        inputVariant='base'
                        divClassName='flex flex-col'
                        placeholder='$ 625'
                        error={errors.rothContribution?.message}
                        description='How much do you put in all Roth accounts each month?'
                    />

                    <InputField 
                        id='rothReturnRate'
                        name='rothReturnRate'
                        registration={register('rothReturnRate')}
                        label='Roth Return Rate'
                        type='number'
                        labelVariant='base'
                        inputVariant='base'
                        divClassName='flex flex-col'
                        placeholder='10 %'
                        error={errors.rothReturnRate?.message}
                        description='What return rate are you expecting?  Typical annual rates vary between 6% - 12%.  Not sure?  Try 10% as a starting point.'
                    />
                </div>}
            </div>

            <div>
                <div onClick={() => toggleTraditional()}>
                    <h2>Traditional Accounts</h2>
                </div>
                {traditionalOpen &&
                <div>
                    <InputField 
                        id='totalTraditional'
                        name='totalTraditional'
                        registration={register('totalTraditional')}
                        label='Total Traditional Balance'
                        type='number'
                        labelVariant='base'
                        inputVariant='base'
                        divClassName='flex flex-col'
                        placeholder='$ 50,000'
                        error={errors.totalTraditional?.message}
                        description='This is total tradtional dollars (including Safe Harbor contributions) in all retirement accounts.'
                    />

                    <InputField 
                        id='tradtionalContribution'
                        name='tradtionalContribution'
                        registration={register('tradtionalContribution')}
                        label='Traditional Contribution'
                        type='number'
                        labelVariant='base'
                        inputVariant='base'
                        divClassName='flex flex-col'
                        placeholder='$ 500'
                        error={errors.tradtionalContribution?.message}
                        description='How much do you put in all traditional accounts each month?'
                    />

                    <InputField 
                        id='traditionalEmployerContribution'
                        name='traditionalEmployerContribution'
                        registration={register('traditionalEmployerContribution')}
                        label='Traditional Employer Contribution'
                        type='number'
                        labelVariant='base'
                        inputVariant='base'
                        divClassName='flex flex-col'
                        placeholder='$ 300'
                        error={errors.traditionalEmployerContribution?.message}
                        description='How much does your employer contribute to all traditional accounts each month?'
                    />

                    <InputField 
                        id='tradtionalReturnRate'
                        name='tradtionalReturnRate'
                        registration={register('tradtionalReturnRate')}
                        label='Tradtional Return Rate'
                        type='number'
                        labelVariant='base'
                        inputVariant='base'
                        divClassName='flex flex-col'
                        placeholder='10 %'
                        error={errors.tradtionalReturnRate?.message}
                        description='What return rate are you expecting?  Typical annual rates vary between 6% - 12%.  Not sure?  Try 10% as a starting point.'
                    />
                </div>}
            </div>

            <div>
                <div onClick={() => toggleHsa()}>
                    <h2>HSA Accounts</h2>
                </div>
                {hsaOpen &&
                <div>
                    <InputField 
                        id='totalHsa'
                        name='totalHsa'
                        registration={register('totalHsa')}
                        label='Total HSA Balance'
                        type='number'
                        labelVariant='base'
                        inputVariant='base'
                        divClassName='flex flex-col'
                        placeholder='$ 5,000'
                        error={errors.totalHsa?.message}
                        description='How much do you put in all HSA accounts each month?'
                    />


                    <InputField 
                        id='hsaContributions'
                        name='hsaContributions'
                        registration={register('hsaContributions')}
                        label='HSA Contributions'
                        type='number'
                        labelVariant='base'
                        inputVariant='base'
                        divClassName='flex flex-col'
                        placeholder='$ 200'
                        error={errors.hsaContributions?.message}
                        description='How much do you put in all HSA accounts each month?'
                    />

                    <InputField 
                        id='hsaReturnRate'
                        name='hsaReturnRate'
                        registration={register('hsaReturnRate')}
                        label='HSA Return Rate'
                        type='number'
                        labelVariant='base'
                        inputVariant='base'
                        divClassName='flex flex-col'
                        placeholder='10 %'
                        error={errors.hsaReturnRate?.message}
                        description='What return rate are you expecting?  Typical annual rates vary between 6% - 12%.  Not sure?  Try 10% as a starting point.'
                    />
                </div>}
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
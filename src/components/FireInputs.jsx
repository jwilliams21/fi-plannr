import { InputField } from './ui/InputField';
import { Button } from './ui/Button';

export default function FireInputs({register, errors}) {
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
                description='test description for Current Age input'
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
            />

            <InputField 
                id='totalBrokerage'
                name='totalBrokerage'
                registration={register('totalBrokerage')}
                label='Total Brokerage Amount'
                type='number'
                labelVariant='base'
                inputVariant='base'
                divClassName='flex flex-col'
                placeholder='$ 50,000'
                error={errors.totalBrokerage?.message}
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
            />

            <InputField 
                id='totalRoth'
                name='totalRoth'
                registration={register('totalRoth')}
                label='Total Roth Amount'
                type='number'
                labelVariant='base'
                inputVariant='base'
                divClassName='flex flex-col'
                placeholder='$ 20,000'
                error={errors.totalRoth?.message}
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
            />

            <InputField 
                id='totalTraditionalAmount'
                name='totalTraditionalAmount'
                registration={register('totalTraditionalAmount')}
                label='Total Traditional Amount'
                type='number'
                labelVariant='base'
                inputVariant='base'
                divClassName='flex flex-col'
                placeholder='$ 50,000'
                error={errors.totalTraditionalAmount?.message}
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
                placeholder='8 %'
                error={errors.tradtionalReturnRate?.message}
            />

            <InputField 
                id='totalHsaAmount'
                name='totalHsaAmount'
                registration={register('totalHsaAmount')}
                label='Total HSA Amount'
                type='number'
                labelVariant='base'
                inputVariant='base'
                divClassName='flex flex-col'
                placeholder='$ 5,000'
                error={errors.totalHsaAmount?.message}
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
                placeholder='8 %'
                error={errors.hsaReturnRate?.message}
            />

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
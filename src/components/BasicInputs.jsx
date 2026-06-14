import { InputField } from './ui/InputField';
import { Button } from './ui/Button';

export default function BasicInputs({ register, errors, compoundFrequency, onCompoundFrequencyChange, contributionTiming, onContributionTimingChange, contributionFrequency, onContributionFrequencyChange }) {

  return (
    <div className='p-6 w-full flex flex-col gap-4'>
      <InputField
        id='startingAmt'
        name='startingAmt'
        registration={register('startingAmt')}
        label='Starting Amount'
        type='number'
        labelVariant='base'
        inputVariant='base'
        divClassName='flex flex-col'
        placeholder='$ 10,000'
        prefix='$'
        error={errors.startingAmt?.message}
      />

      <InputField
        id='duration'
        name='duration'
        registration={register('duration')}
        label='Duration (Years)'
        type='number'
        labelVariant='base'
        inputVariant='base'
        divClassName='flex flex-col'
        placeholder='30'
        prefix='#'
        error={errors.duration?.message}
      />

      <InputField
        id='returnRate'
        name='returnRate'
        registration={register('returnRate')}
        label='Period Rate'
        type='number'
        labelVariant='base'
        inputVariant='base'
        divClassName='flex flex-col'
        placeholder='10 %'
        prefix='%'
        error={errors.returnRate?.message}
      />

      <div>
        <label className='w-full text-xl'>Compound</label>
        <div className='my-2 grid grid-cols-2 border-4 border-gray-800 rounded-xl'>
          <Button variant='toggle' active={compoundFrequency === 'annual' ? true : false}  onClick={() => {onCompoundFrequencyChange('annual')}}>Annually</Button>
          <Button variant='toggle' active={compoundFrequency === 'monthly' ? true : false} onClick={() => {onCompoundFrequencyChange('monthly')}}>Monthly</Button>
        </div>
      </div>

      <InputField
        id='addContribute'
        name='addContribute'
        registration={register('addContribute')}
        label='Additional Contributions'
        type='number'
        labelVariant='base'
        inputVariant='base'
        divClassName='flex flex-col'
        placeholder='$ 100'
        prefix='$'
        error={errors.addContribute?.message}
      />

      <div>
        <label className='w-full text-xl'>Contribute at the </label>
        <div className='my-2 grid grid-cols-2 border-4 border-gray-800 rounded-xl'>
          <Button variant='toggle' active={contributionTiming === 'beginning' ? true  : false} onClick={() => {onContributionTimingChange('beginning')}}>Beginning</Button>
          <Button variant='toggle' active={contributionTiming === 'end' ? true  : false} onClick={() => {onContributionTimingChange('end')}}>End</Button>
        </div>

        <label className='w-full text-xl'>of each</label>
        <div className='my-2 grid grid-cols-2 border-4 border-gray-800 rounded-xl'>
          <Button variant='toggle' active={contributionFrequency === 'monthly' ? true : false} onClick={() => {onContributionFrequencyChange('monthly')}}>Month</Button>
          <Button variant='toggle' active={contributionFrequency === 'yearly' ? true : false} onClick={() => {onContributionFrequencyChange('yearly')}}>Year</Button>
        </div>
      </div>
    </div>
  )
}
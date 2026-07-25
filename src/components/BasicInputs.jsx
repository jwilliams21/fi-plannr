import { InputField } from './ui/InputField';
import { Button } from './ui/Button';

export default function BasicInputs({ register, errors, contributionTiming, onContributionTimingChange, contributionFrequency, onContributionFrequencyChange }) {

  return (
    <div className='p-6 w-full flex flex-col gap-8'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <InputField
          id='startingAmt'
          name='startingAmt'
          registration={register('startingAmt')}
          label='Starting Balance'
          type='number'
          step='0.01'
          labelVariant='base'
          labelInfoVariant='base'
          inputVariant='base'
          divClassName='flex flex-col'
          placeholder='10,000'
          symbolType='currency'
          error={errors.startingAmt}
          description='How much do you already have?'
        />

        <InputField
          id='duration'
          name='duration'
          registration={register('duration')}
          label='Duration'
          type='number'
          step='1'
          labelVariant='base'
          labelInfoVariant='base'
          inputVariant='base'
          divClassName='flex flex-col'
          placeholder='30 years'
          error={errors.duration}
          description='How many years do you plan to invest this money?'
        />

        <InputField
          id='returnRate'
          name='returnRate'
          registration={register('returnRate')}
          label='Return Rate'
          type='number'
          step='0.01'
          labelVariant='base'
          labelInfoVariant='base'
          inputVariant='base'
          divClassName='flex flex-col'
          placeholder='8 %'
          symbolType='percentage'
          error={errors.returnRate}
          description='What return rate are you expecting?  If you are not sure, try 8% to start.'
        />

        <InputField
          id='addContribute'
          name='addContribute'
          registration={register('addContribute')}
          label='Additional Contributions'
          type='number'
          step='0.01'
          labelVariant='base'
          labelInfoVariant='base'
          inputVariant='base'
          divClassName='flex flex-col'
          placeholder='100'
          symbolType='currency'
          error={errors.addContribute}
          description='How much are you adding to your starting amount and when do you make that contribution?'
        />
      </div>

      <div className='md:grid md:grid-cols-[1fr_2fr_1fr_2fr] md:place-items-center'>
          <label className='w-full text-lg font-semibold'>Contribute at the </label>
          <div className='my-2 grid grid-cols-2 border-2 border-slate-200 rounded-xl w-full'>
            <Button variant='toggle' active={contributionTiming === 'beginning' ? true  : false} onClick={() => {onContributionTimingChange('beginning')}}>Beginning</Button>
            <Button variant='toggle' active={contributionTiming === 'end' ? true  : false} onClick={() => {onContributionTimingChange('end')}}>End</Button>
          </div>

          <label className='w-full text-lg font-semibold md:text-center'>of each</label>
          <div className='my-2 grid grid-cols-2 border-2 border-slate-200 rounded-xl w-full'>
            <Button variant='toggle' active={contributionFrequency === 'monthly' ? true : false} onClick={() => {onContributionFrequencyChange('monthly')}}>Month</Button>
            <Button variant='toggle' active={contributionFrequency === 'yearly' ? true : false} onClick={() => {onContributionFrequencyChange('yearly')}}>Year</Button>
          </div>
      </div>
    </div>
  )
}
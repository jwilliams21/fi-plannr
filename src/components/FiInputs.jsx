import React from 'react';
import { InputField } from './ui/InputField';

export default function FiInputs({ register, errors }) {

  return (
    <div className="p-6 w-full flex flex-col gap-4">
      <InputField
        id="startingAmt"
        name="startingAmt"
        registration={register('startingAmt')}
        label="Starting Amount"
        type="number"
        labelVariant="base"
        inputVariant="base"
        divClassName="flex flex-col"
        placeholder="10,000"
        prefix="$"
        error={errors.startingAmt?.message}
      />

      <InputField
        id="duration"
        name="duration"
        registration={register('duration')}
        label="Duration (Years)"
        type="number"
        labelVariant="base"
        inputVariant="base"
        divClassName="flex flex-col"
        placeholder="30"
        prefix="#"
        error={errors.duration?.message}
      />

      <InputField
        id="returnRate"
        name="returnRate"
        registration={register('returnRate')}
        label="Return Rate"
        type="number"
        labelVariant="base"
        inputVariant="base"
        divClassName="flex flex-col"
        placeholder="10"
        prefix="%"
        error={errors.returnRate?.message}
      />

      <InputField
        id="addContribute"
        name="addContribute"
        registration={register('addContribute')}
        label="Additional Contributions"
        type="number"
        labelVariant="base"
        inputVariant="base"
        divClassName="flex flex-col"
        placeholder="100"
        prefix="$"
        error={errors.addContribute?.message}
      />
    </div>
  )
}
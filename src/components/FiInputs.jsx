import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fiSchema } from '../features/fi-calculator/fiSchema';
import { InputField } from './ui/InputField';

export default function FiInputs() {

  return (
    <form className="p-6 w-full flex flex-col gap-4">
      <InputField
        id="startingAmount"
        label="Starting Amount"
        type="number"
        labelVariant="base"
        inputVariant="base"
        divClassName="flex flex-col"
        placeholder="10,000"
        prefix="$"
      />

      <InputField
        id="duration"
        label="Duration (Years)"
        type="number"
        labelVariant="base"
        inputVariant="base"
        divClassName="flex flex-col"
        placeholder="30"
        prefix="#"
      />

      <InputField
        id="returnRate"
        label="Return Rate"
        type="number"
        labelVariant="base"
        inputVariant="base"
        divClassName="flex flex-col"
        placeholder="10"
        prefix="%"
      />

      <InputField
        id="additionalContribution"
        label="Additional Contributions"
        type="number"
        labelVariant="base"
        inputVariant="base"
        divClassName="flex flex-col"
        placeholder="100"
        prefix="$"
      />
    </form>
  )
}
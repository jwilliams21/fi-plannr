import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fireFormSchema } from '../features/fi-calculator/fiSchema';
import { InputField } from './ui/InputField';

export default function FiInputs() {

  return (
    <form>
      <InputField
        id="startingAmount"
        label="Starting Amount"
      />
    </form>
  )
}
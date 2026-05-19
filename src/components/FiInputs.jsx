import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fireFormSchema } from '../schemas/fireSchema';
import { InputField } from '../../../components/ui/InputField';

export default function FiInputs() {

  return (
    <form>
      <InputField />
    </form>
  )
}
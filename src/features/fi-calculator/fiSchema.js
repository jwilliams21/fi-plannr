import { z } from 'zod';

export const fiSchema = z.object({
    // input validation lives here - this will look through the inputs to determine if bad data is collected before the data ever reaches the math.
    startingAmt: z.coerce.number().min(0, 'Starting amount must be greater than zero.'), 
    duration: z.coerce.number().min(1, 'Duration must be greater than one year.'), 
    rate: z.coerce.number().min(0, 'Interest rates cannot be negative').max(100, 'Interest rates cannot be greater than 100.'), 
    addContribute: z.coerce.number().min(0, 'Additional contributions cannot be less than zero.')
})
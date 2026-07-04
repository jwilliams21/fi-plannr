import { z } from 'zod';

export const basicSchema = z.object({
    startingAmt: z.coerce.number({ invalid_type_error: 'Must be a number.' })
        .min(1, 'Starting amount must be greater than zero.')
        .step(0.01, 'Only two places past the decimal is allowed.')
        .default(10000), 
    duration: z.coerce.number({ invalid_type_error: 'Must be a number.' })
        .min(1, 'Duration must be at least one year.')
        .max(100, 'Duration must be less than 100.')
        .step(1, 'Only whole years allowed.')
        .default(30), 
    returnRate: z.coerce.number({ invalid_type_error: 'Must be a number.' })
        .min(1, 'Interest rates cannot be negative')
        .max(100, 'Interest rates cannot be greater than 100.')
        .step(0.01, 'Only two places past the decimal is allowed.')
        .default(8), 
    addContribute: z.coerce.number({ invalid_type_error: 'Must be a number.' })
        .min(0, 'Additional contributions cannot be less than zero.')
        .step(0.01, 'Only two places past the decimal is allowed.')
        .default(0)
})

// input validation lives here - this will look through the inputs to determine if bad data is collected before the data ever reaches the basic math.
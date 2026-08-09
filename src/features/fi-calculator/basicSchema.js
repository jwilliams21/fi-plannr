import { z } from 'zod';

const numericDefault = (fallback, minVal = 0, minMessage, maxVal, maxMessage) => {
    return z.preprocess(
        (val) => {
            if (val === '' || val === null || val === undefined) return undefined;
            const parsed = Number(val);
            return Number.isNaN(parsed) ? undefined : parsed;
        },
        z
         .number({invalid_type_error: 'Must be a number'})
         .min(minVal, minMessage || `Must be at least ${minMessage}`)
         .max(maxVal, maxMessage || `Must be no more than ${maxMessage}`)
         .default(fallback)
    )
}

export const basicSchema = z.object({
    startingAmt: numericDefault(0, 0, 'Amount must be a positive value', 1000000000, "Really...?  C'mon"), 
    duration: numericDefault(1, 1, 'Duration must be at least one year', 100, "You're not even alive anymore!"), 
    returnRate: numericDefault(0, 0, 'Return rate must be a positive value', 100, "Really?  C'mon"), 
    addContribute: numericDefault(0, 0, 'Contribution must be a positive value', 1000000000, "Really...?  C'mon")
})

// input validation lives here - this will look through the inputs to determine if bad data is collected before the data ever reaches the basic math.
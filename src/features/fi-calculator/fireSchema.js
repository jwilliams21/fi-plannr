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

export const fireSchema = z.object({
    currentAge: numericDefault(25, 1, 'Age must be at least one years old', 120, 'You are no longer alive.  Please alive'),
    fireAge: numericDefault(55, 2, 'Age must be at least two years old', 120, 'You are no longer alive.  Please alive'),
    currentAnnualExpenses: numericDefault(0, 0, 'Expenses must be a positive value', 1000000, 'Keep your expenses realistic, Champ'),
    totalBrokerage: numericDefault(0, 0, 'Balance must be a positive value', 1000000000, "Really...? C'mon"),
    brokerageContribution: numericDefault(0, 0, 'Contribution must be a positive value', 1000000000, "Really...? C'mon"),
    brokerageReturnRate: numericDefault(0, 0, 'Return rate must be a positive value', 100, "Really...? C'mon"),
    totalRoth: numericDefault(0, 0, 'Balance must be a positive value', 1000000000, "Really...? C'mon"),
    rothContribution: numericDefault(0, 0, 'Contribution must be a positive value', 1000000000, "Really...? C'mon"),
    rothReturnRate: numericDefault(0, 0, 'Return rate must be a positive value', 100, "Really...? C'mon"),
    totalTraditional: numericDefault(0, 0, 'Balance must be a positive value', 1000000000, "Really...? C'mon"),
    traditionalContribution: numericDefault(0, 0, 'Contribution must be a positive value', 1000000000, "Really...? C'mon"),
    traditionalEmployerContribution: numericDefault(0, 0, 'Contribution must be a positive value', 1000000000, "Really...? C'mon"),
    traditionalReturnRate: numericDefault(0, 0, 'Return rate must be a positive value', 100, "Really...? C'mon"),
    totalHsa: numericDefault(0, 0, 'Balance must be a positive value', 1000000000, "Really...? C'mon"),
    hsaContributions: numericDefault(0, 0, 'Contribution must be a positive value', 1000000000, "Really...? C'mon"),
    hsaReturnRate: numericDefault(0, 0, 'Return rate must be a positive value', 100, "Really...? C'mon")
})
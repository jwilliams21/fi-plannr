import { z } from 'zod';

export const fireSchema = z.object({
    currentAge: z.coerce.number()
        .min(1, 'Age must be greater than 0.')
        .max(110, 'You are no longer alive.  Please alive.')
        .step(1, 'Only whole years allowed.')
        .default(30),
    fireAge: z.coerce.number()
        .min(1, 'Fire Age must be greater than 0.')
        .max(110, 'You are no longer alive.  Please alive.')
        .step(1, 'Only whole years allowed.')
        .default(55),
    currentAnnualExpenses: z.coerce.number()
        .min(0, 'Annual expenses must greater than 0.')
        .step(0.01, 'Only two places past the decimal is allowed.')
        .default(0),
    totalBrokerage: z.coerce.number()
        .min(0, 'Total brokerage cannot be a negative balance.')
        .step(0.01, 'Only two places past the decimal is allowed.')
        .default(0),
    brokerageContribution: z.coerce.number()
        .min(0, 'Brokerage contribution cannot be a negative balance.')
        .step(0.01, 'Only two places past the decimal is allowed.')
        .default(0),
    brokerageReturnRate: z.coerce.number()
        .min(0.01, 'Brokerage return rate must be greater than 0.')
        .step(0.01, 'Only two places past the decimal is allowed.')
        .default(8),
    totalRoth: z.coerce.number()
        .min(0, 'Total roth cannot be a negative balance.')
        .step(0.01, 'Only two places past the decimal is allowed.')
        .default(0),
    rothContribution: z.coerce.number()
        .min(0, 'Roth contribution cannot be a negative balance.')
        .step(0.01, 'Only two places past the decimal is allowed.')
        .default(0),
    rothReturnRate: z.coerce.number()
        .min(0.01, 'Roth return rate must be greater than 0.')
        .step(0.01, 'Only two places past the decimal is allowed.')
        .default(8),
    totalTraditional: z.coerce.number()
        .min(0, 'Total traditional cannot be a negative balance.')
        .step(0.01, 'Only two places past the decimal is allowed.')
        .default(0),
    traditionalContribution: z.coerce.number()
        .min(0, 'Traditional contribution cannot be a negative balance.')
        .step(0.01, 'Only two places past the decimal is allowed.')
        .default(0),
    traditionalEmployerContribution: z.coerce.number()
        .min(0, 'Traditional employer contributions cannot be a negative balance.')
        .step(0.01, 'Only two places past the decimal is allowed.')
        .default(0),
    traditionalReturnRate: z.coerce.number()
        .min(0.01, 'Traditional return rate must be greater than 0.')
        .step(0.01, 'Only two places past the decimal is allowed.')
        .default(8),
    totalHsa: z.coerce.number()
        .min(0, 'Total HSA cannot be a negative balance.')
        .step(0.01, 'Only two places past the decimal is allowed.')
        .default(0),
    hsaContributions: z.coerce.number()
        .min(0, 'Total HSA contributions cannot be a negative balance.')
        .step(0.01, 'Only two places past the decimal is allowed.')
        .default(0),
    hsaReturnRate: z.coerce.number()
        .min(0.01, 'HSA return rate must be greater than 0.')
        .step(0.01, 'Only two places past the decimal is allowed.')
        .default(8)
})
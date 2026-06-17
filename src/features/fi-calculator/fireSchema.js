import { z } from 'zod';

export const fireSchema = z.object({
    currentAge: z.coerce.number().min(1, 'Age must be greater than 0.').max(110, 'You are no longer alive.  Please alive.'),
    fireAge: z.coerce.number().min(1, 'Fire Age must be greater than 0.').max(110, 'You are no longer alive.  Please alive.'),
    currentAnnualExpenses: z.coerce.number().min(1, 'Annual expenses must greater than 0.'),
    totalBrokerage: z.coerce.number().min(0, 'Total brokerage cannot be a negative balance.'),
    brokerageContribution: z.coerce.number().min(0, 'Brokerage contribution cannot be a negative balance.'),
    brokerageReturnRate: z.coerce.number().min(0.01, 'Brokerage return rate must be greater than 0.'),
    totalRoth: z.coerce.number().min(0, 'Total roth cannot be a negative balance.'),
    rothContribution: z.coerce.number().min(0, 'Roth contribution cannot be a negative balance.'),
    rothReturnRate: z.coerce.number().min(0.01, 'Roth return rate must be greater than 0.'),
    totalTraditional: z.coerce.number().min(0, 'Total traditional cannot be a negative balance.'),
    tradtionalContribution: z.coerce.number().min(0, 'Traditional contribution cannot be a negative balance.'),
    traditionalEmployerContribution: z.coerce.number().min(0, 'Traditional employer contributions cannot be a negative balance.'),
    tradtionalReturnRate: z.coerce.number().min(0.01, 'Traditional return rate must be greater than 0.'),
    totalHsa: z.coerce.number().min(0, 'Total HSA cannot be a negative balance.'),
    hsaContributions: z.coerce.number().min(0, 'Total HSA contributions cannot be a negative balance.'),
    hsaReturnRate: z.coerce.number().min(0.01, 'HSA return rate must be greater than 0.')
})
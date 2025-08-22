import { z } from 'zod';

export const participantSchema = z.object({
    role: z.enum(['CSM','PC','DRIVER','CUSTOMER']),
    name: z.string().optional().default(''),
    signatureUrl: z.string().url().optional(),
});

export const tripDetailSchema = z.object({
    tripNo: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6)]),
    tripRoute: z.string().optional().default(''),
    tripStartDate: z.string().optional(),
    tripEndDate: z.string().optional(),
    startKm: z.number().nullable().optional(),
    endKm: z.number().nullable().optional(),
    tripKm: z.number().nullable().optional(),
    maxSpeed: z.number().nullable().optional(),
    weightGVW: z.number().nullable().optional(),
    actualDieselLtrs: z.number().nullable().optional(),
    totalTripKm: z.number().nullable().optional(),
    actualFE: z.number().nullable().optional(),
});

export const signOffCreateSchema = z.object({
    customerName: z.string().min(1),
    customerExpectedFE: z.number().nullable().optional(),
    beforeTrialsFE: z.number().nullable().optional(),
    afterTrialsFE: z.number().nullable().optional(),
    customerVehicleDetails: z.any().optional(),
    issuesFoundDuringTrial: z.string().optional(),
    trialRemarks: z.string().optional(),
    customerRemarks: z.string().optional(),
    createdByRole: z.enum(['DRIVER','ADMIN']),
    participants: z.array(participantSchema).optional(),
    tripDetails: z.array(tripDetailSchema).optional(),
    photos: z.array(z.object({ fileUrl: z.string().url(), caption: z.string().optional() })).optional(),
});

export type SignOffCreateDto = z.infer<typeof signOffCreateSchema>;
import {z} from "zod"

export const enterpriseSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phoneNumber: z.string().min(10),
    address: z.string().optional(),
    industryType: z.string().optional(),
})

export const gasEmissionSchema = z.object({
    coLevel: z.number().min(0),
    ch4Level: z.number().min(0),
    nh3Level: z.number().min(0),
    no2Level: z.number().min(0),
    ozoneLevel: z.number().min(0),
})
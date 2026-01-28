import z from 'zod';

export const signUpSchema = z.object({
    displayName: z.string().min(1).max(100),
    username: z.string().min(6).max(20),
    email: z.email(),
    password: z.string().min(6)
}) 

export const signInSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(6)
})
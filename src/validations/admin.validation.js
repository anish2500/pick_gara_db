import {z} from 'zod';

export const registerAdminSchema = z.object({
    fullName: z.string().min(2, 'Full Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),

});


export const loginAdminSchema = z.object({
    email: z.string().email('Invalid email address'), 
    password: z.string().min(1, 'Password is required'),
});
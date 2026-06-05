import {z} from 'zod'; 


export const createPlaceSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    category: z.enum(['cafe', 'momo', 'hiking'], {
        message: 'Category must be cafe, momo, or hiking',
    }),
    image: z.string().url('Image must be a valid URL'),
    rating: z.number().min(0).max(5),
    location: z.string().min(1, 'Location is required'),
    priceRange: z.string().min(1, 'Price range is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
});



export const updatePlaceSchema = z.object({
    name: z.string().min(2).optional(), 
    category: z.enum(['cafe', 'momo', 'hiking']).optional(),
    image: z.string().url('Image must be a valid URL').optional(),
    rating: z.number().min(0).max(5).optional(),
    location: z.string().min(2).optional(),
    priceRange: z.string().min(1).optional(),
    description: z.string().min(10).optional(),
    isActive: z.boolean().optional(),
}); 
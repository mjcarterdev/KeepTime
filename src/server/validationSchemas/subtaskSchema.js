import z from 'zod';

export const subtaskSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: 'Must be at least 1 character long' })
      .max(255, { message: 'Must be less than 255 characters long' })
      .optional(),
    description: z
      .string()
      .optional(),
  }),
});
import z from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email('not a valid email')
      .min(1, { message: 'Must be at least 1 character long' })
      .max(255, { message: 'Must be less than 255 characters long' }),
    password: z
      .string()
      .min(8, { message: 'Must be 8 or more characters long' })
      .max(40, { message: 'Must be less than 40 characters long' }),
  }),
});

export const registerSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .min(1, { message: 'Must be at least 1 character long' })
        .max(255, { message: 'Must be less than 255 characters long' }),
      email: z
        .string()
        .email('not a valid email')
        .min(1, { message: 'Must be at least 1 character long' })
        .max(255, { message: 'Must be less than 255 characters long' }),
      password: z
        .string()
        .min(8, { message: 'Must be 8 or more characters long' })
        .max(40, { message: 'Must be less than 40 characters long' }),
      confirm: z
        .string()
        .min(8, { message: 'Must be 8 or more characters long' })
        .max(40, { message: 'Must be less than 40 characters long' }),
    })
    .refine((schema) => schema.password === schema.confirm, {
      message: "Passwords don't match",
      path: ['confirm'], // path of error
    }),
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z
      .string()
      .min(1, { message: 'Refresh Token is missing' })
      .max(300, { message: 'Refresh Token is to long' }),
  }),
});

export const revokeRefreshTokensSchema = z.object({
  body: z.object({
    userId: z.string().uuid({ message: 'Not a uuid' }).min(1, { message: 'userId is missing' }),
  }),
});

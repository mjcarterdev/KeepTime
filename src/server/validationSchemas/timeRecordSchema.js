import z from 'zod';

export const timeRecordSchema = z.object({
  body: z.object({
    startTime: z
      .string()
      .datetime({ offset: true })
      .optional(),
    endTime: z
      .string()
      .datetime({ offset: true })
      .optional(),
  }),
});
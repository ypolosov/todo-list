import { z } from 'zod';

export const taskSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(200),
  status: z.union([z.literal('active'), z.literal('completed')]),
});

export const tasksSchema = z.array(taskSchema);

export type StoredTask = z.infer<typeof taskSchema>;

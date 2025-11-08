import { z } from 'zod'

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(1, 'O título é obrigatório')
    .max(100, 'O título deve ter no máximo 100 caracteres')
    .trim(),
  description: z
    .string()
    .max(500, 'A descrição deve ter no máximo 500 caracteres')
    .default(''),
  priority: z.enum(['low', 'medium', 'high']).default('low'),
})

export type TaskFormData = z.infer<typeof taskFormSchema>

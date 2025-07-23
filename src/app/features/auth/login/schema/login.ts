import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().nonempty('ឈ្មោះគណនីចាំបាច់ត្រូវបំពេញ'),
  password: z.string().nonempty('ពាក្យសម្ងាត់ចំបាច់ត្រូវបំពេញ'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

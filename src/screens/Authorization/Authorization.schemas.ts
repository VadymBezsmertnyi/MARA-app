import { z } from 'zod';

export const authorizationS = z.enum(['phone', 'password']);

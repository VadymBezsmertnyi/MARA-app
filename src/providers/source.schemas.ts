import { z } from 'zod';

export const shortResponseS = z.object({ result: z.boolean(), code: z.number() });

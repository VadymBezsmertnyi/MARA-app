import { z } from 'zod';
import { workshopS, workshopsS } from './workshops.schemas';

export type WorkshopT = z.infer<typeof workshopS>;
export type WorkshopsT = z.infer<typeof workshopsS>;

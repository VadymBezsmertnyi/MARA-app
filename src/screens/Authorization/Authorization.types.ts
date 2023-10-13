import { z } from 'zod';
import { authorizationS } from './Authorization.schemas';

export type KeysAuthorizationT = z.infer<typeof authorizationS>;
export type AuthorizationT = Record<KeysAuthorizationT, string>;

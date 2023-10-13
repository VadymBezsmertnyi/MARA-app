import { ZodNumber, ZodString, ZodType, ZodTypeAny, objectOutputType, z } from 'zod';
import { Language } from '../locales/locales.types';
import { AppProvider } from './app.provider';
import { sessionSchema } from './app.schema';

export type DependencyList = ReadonlyArray<string | number | boolean | null | undefined>;
export type SessionType = z.infer<typeof sessionSchema>;

export interface AppContext {
  techStore: {
    readonly constructorsDeps?: {
      [name: string]: DependencyList;
    };
    session?: SessionType | null;
    readonly requests?: Array<{ fn: () => unknown; name: string }>;
    readonly maxAges?: [string, number, number, string | null][];
  };
  store: null | Partial<{
    // readonly changeLanguage: (language: Language) => void;
    //  readonly staticPages: StaticPages;
  }>;
  api: InstanceType<typeof AppProvider>['api'];
  setTechStore: InstanceType<typeof AppProvider>['setTechStore'];
  getTechStore: InstanceType<typeof AppProvider>['getTechStore'];
}

export type Props = {
  children: React.ReactNode;
  techStore: AppContext['techStore'];
  store: AppContext['store'];
  language: Language;
};

export type State = {
  context: AppContext;
};

export type ApiReturnType<T> = objectOutputType<
  { code: ZodNumber; status: ZodString; data: ZodType<T> },
  ZodTypeAny
>;

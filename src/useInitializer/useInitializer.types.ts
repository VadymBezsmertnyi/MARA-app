import type { reduce } from './useInitializer.helpers';

export type CallBack<T> = (arg0: { reduce: typeof reduce }) => Promise<T>;
export type Options = { restoreScroll?: boolean; scrollBehavior?: 'auto' | 'smooth' };
export type DependencyList = ReadonlyArray<string | number | boolean | null | undefined>;

import type { DependencyList, Options } from './useInitializer.types';

/**
 * Very primitive but type safe function that will merge all passed arguments
 * In the future versions of typescript should be checked another solutuions
 *
 * @param      {T}       target   The target
 * @param      {A}       source1  The source 1
 * @param      {B}       source2  The source 2
 * @param      {C}       source3  The source 3
 * @param      {D}       source4  The source 4
 * @param      {E}       source5  The source 5
 * @param      {F}       source6  The source 6
 * @param      {G}       source7  The source 7
 * @param      {H}       source8  The source 8
 * @param      {I}       source9  The source 9
 * @return     {T & A & B & C & D & E & F & G & H & I}  merged objects
 */
export function reduce<T, A, B, C, D, E, F, G, H, I>(
  target: T,
  source1: A,
  source2?: B,
  source3?: C,
  source4?: D,
  source5?: E,
  source6?: F,
  source7?: G,
  source8?: H,
  source9?: I,
  ...rest: unknown[]
) {
  if (rest.length > 0) {
    throw new Error('Extend number of arguments in reduce function');
  }
  return {
    ...target,
    ...source1,
    ...source2,
    ...source3,
    ...source4,
    ...source5,
    ...source6,
    ...source7,
    ...source8,
    ...source9,
  };
}

export function areHookDepsEqual(prevDeps: DependencyList | null, nextDeps: DependencyList) {
  if (prevDeps === null) {
    return false;
  }

  if (prevDeps.length !== nextDeps.length) {
    return false;
  }
  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (!Object.is(nextDeps[i], prevDeps[i])) {
      return false;
    }
  }
  return true;
}

export function restoreScroll(scrollBehavior: Options['scrollBehavior']) {
  const { pathname, search } = window.location;
  const scrollPos = Number(sessionStorage.getItem(`${pathname}${search}`));
  if (scrollPos) {
    window.scrollTo({ top: scrollPos, behavior: scrollBehavior || 'auto' });
    sessionStorage.removeItem(`${pathname}${search}`);
  }
}

import { useRef, useState, useEffect, useContext } from 'react';

// provider
import { appContext } from '../providers/app/app.provider';
import { loadingContext } from '../providers/loading/loading.provider';

// types
import type { CallBack, DependencyList, Options } from './useInitializer.types';

// helps
import { areHookDepsEqual, reduce, restoreScroll } from './useInitializer.helpers';

// constants
import { IS_NODE } from './useInitializer.const';

export function useInitializer<T>(
  callBack: CallBack<T>,
  deps?: DependencyList,
  options: Options = {
    restoreScroll: false,
    scrollBehavior: 'auto',
  },
): { isLoading: boolean } {
  if (!callBack.name) throw Error('Only named function allowed as useInitializer callback');

  const { setTechStore, getTechStore } = useContext(appContext);

  const state = useRef<{
    deps: DependencyList | null;
    response: null | Promise<T> | { fn: () => Promise<T>; name: string | CallBack<T> };
  }>({
    deps: getTechStore('constructorsDeps')?.[callBack.name] || null,
    response: null,
  });

  const nextDeps = deps === undefined ? null : deps;
  const prevDeps = state.current.deps;

  const isDepsChanged = nextDeps === null || !areHookDepsEqual(prevDeps, nextDeps);

  const [isLoading, setLoading] = useState(isDepsChanged);
  const { setLoading: setLoadingContext } = useContext(loadingContext);

  if (isDepsChanged && process.env.NODE_ENV !== 'test') {
    if (process.env.BUILD_ENV !== 'production') {
      console.info(
        `%cRun useInitializer with name ${callBack.name}`,
        'color: orange; font-weight: bold;',
      );
    }

    state.current.response = IS_NODE
      ? { fn: () => callBack({ reduce }), name: callBack.name || callBack }
      : callBack({ reduce });

    state.current.deps = nextDeps;

    if (IS_NODE) {
      setTechStore('constructorsDeps', {
        ...(getTechStore('constructorsDeps') || {}),
        [callBack.name]: nextDeps,
      });
      const requests = getTechStore('requests') || [];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setTechStore('requests', requests.concat(state.current.response));
    }
  }

  useEffect(() => {
    if (process.env.NODE_ENV === 'test') {
      return undefined;
    }
    let isValidResponse = true;
    if (state.current.response && state.current.response instanceof Promise) {
      setLoading(true);
      setLoadingContext(true);
      state.current.response?.finally(() => {
        if (isValidResponse) {
          state.current.response = null;
          setLoading(false);

          if (options.restoreScroll) {
            restoreScroll(options.scrollBehavior);
          }
        }
        setLoadingContext(false);
      });
    }
    return () => {
      if (state.current.response && state.current.response instanceof Promise) {
        isValidResponse = false;
      }
    };
  }, [state.current.response]);

  if (process.env.NODE_ENV === 'test') {
    return { isLoading: false };
  }

  return { isLoading };
}

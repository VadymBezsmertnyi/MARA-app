import React, { FunctionComponent, useMemo, useState } from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

// components
import { Loader } from './components/Loader/Loader';

// types
import { LoadingContext, typeLoadingT } from './loading.types';

// styles
import styles from './loading.style';

type LoadingProviderType = {
  children: JSX.Element;
};

export const loadingContext = React.createContext({} as LoadingContext);

export const LoadingProvider: FunctionComponent<LoadingProviderType> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [typeLoading, setTypeLoading] = useState<typeLoadingT>('opacity');
  const isOpacityType = typeLoading === 'opacity';

  const setLoading = (state: boolean, type?: typeLoadingT) => {
    setIsLoading(state);
    if (type) setTypeLoading(type);
  };

  const intensityApp = Platform.OS === 'ios' ? 50 : 1000;
  const intensityShow = isOpacityType ? intensityApp : 1000;
  const blurComponent =
    Platform.OS === 'web' ? (
      <View
        style={StyleSheet.flatten([
          styles.blurStyle,
          styles.blurStyleWeb,
          !isOpacityType ? styles.fullOpacity : null,
        ])}
      />
    ) : (
      //TODO нада змінити на щось інше
      <Animated.View>
        <BlurView
          intensity={intensityShow}
          style={StyleSheet.flatten([
            styles.blurStyle,
            styles.blurStyleApp,
            !isOpacityType ? styles.fullOpacity : null,
          ])}
        >
          <Animated.View />
        </BlurView>
      </Animated.View>
    );

  const contextValue: LoadingContext = useMemo(() => ({ isLoading, setLoading }), [isLoading]);

  return (
    <loadingContext.Provider value={contextValue}>
      {isLoading && <Loader />}
      {isLoading && blurComponent}
      {children}
    </loadingContext.Provider>
  );
};

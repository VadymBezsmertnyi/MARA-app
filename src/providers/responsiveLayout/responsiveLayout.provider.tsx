import React, { useMemo, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// types
import { ResponsiveLayoutContextT, PropsT } from './responsiveLayout.types';

// styles
import { styles } from './responsiveLayout.styles';

export const responsiveLayoutContext = React.createContext({} as ResponsiveLayoutContextT);

export const ResponsiveLayoutProvider: React.FC<PropsT> = ({ children }) => {
  const [durationHeight, setDurationHeight] = useState(0);

  const contentContainerStyle = useMemo(
    () => [styles.container, { paddingBottom: durationHeight }],
    [durationHeight],
  );

  const valueContext = useMemo(() => ({ durationHeight }), [durationHeight]);

  return (
    <responsiveLayoutContext.Provider value={valueContext}>
      <KeyboardAwareScrollView
        horizontal
        disableScrollViewPanResponder
        enableAutomaticScroll={false}
        scrollEnabled={false}
        onKeyboardWillShow={(frames: Object) => {
          const {
            endCoordinates: { height },
          } = frames as {
            endCoordinates: { height: number };
          };
          setDurationHeight(height);
        }}
        onKeyboardDidShow={(frames: Object) => {
          const {
            endCoordinates: { height },
          } = frames as {
            endCoordinates: { height: number };
          };
          setDurationHeight(height);
        }}
        onKeyboardWillHide={() => {
          setDurationHeight(0);
        }}
        onKeyboardDidHide={() => {
          setDurationHeight(0);
        }}
        contentContainerStyle={contentContainerStyle}
      >
        {children}
      </KeyboardAwareScrollView>
    </responsiveLayoutContext.Provider>
  );
};

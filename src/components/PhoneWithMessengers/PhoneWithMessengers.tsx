import React, { FunctionComponent, useMemo } from "react";
import { StyleProp, Text, TextStyle, View } from "react-native";

// icons
import {
  IconLogoTelegram,
  IconLogoViber,
  IconLogoWhatsApp,
} from "../../icons/components";

// styles
import { styles } from "./PhoneWithMessengers.styles";

type PhoneWithMessengersProps = {
  title: string;
  isViber?: boolean;
  isWhatsApp?: boolean;
  isTelegram?: boolean;
  titleStyle?: StyleProp<TextStyle>;
};

export const PhoneWithMessengers: FunctionComponent<
  PhoneWithMessengersProps
> = ({
  title,
  isViber = false,
  isWhatsApp = false,
  isTelegram = false,
  titleStyle,
}) => {
  const listMessengers = useMemo(() => {
    const iconLogoTelegram = isTelegram ? [IconLogoTelegram] : [];
    const iconLogoWhatsApp = isWhatsApp ? [IconLogoWhatsApp] : [];
    const iconLogoViber = isViber ? [IconLogoViber] : [];
    return [...iconLogoViber, ...iconLogoWhatsApp, ...iconLogoTelegram];
  }, [isViber, isWhatsApp, isTelegram]);
  const titleStyles = useMemo(() => [styles.title, titleStyle], [titleStyle]);

  return (
    <View style={styles.container}>
      <Text style={titleStyles}>{title}</Text>
      <View style={styles.containerMessengers}>
        {listMessengers.map((Icon, index) => {
          const stylesIcon = () => {
            if (
              (index === 1 && listMessengers.length > 2) ||
              (index === 0 && listMessengers.length === 2)
            )
              return styles.secondIcon;
            if (index === 0 && listMessengers.length > 2)
              return styles.thirdIcon;
            return undefined;
          };
          return (
            <Icon
              key={`icon-logo-${index + 1}`}
              width={22}
              height={22}
              style={stylesIcon()}
            />
          );
        })}
      </View>
    </View>
  );
};

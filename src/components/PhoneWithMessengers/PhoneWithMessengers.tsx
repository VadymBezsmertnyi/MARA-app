import React, { FunctionComponent, useMemo } from "react";
import { Text, View } from "react-native";

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
};

export const PhoneWithMessengers: FunctionComponent<
  PhoneWithMessengersProps
> = ({ title, isViber = false, isWhatsApp = false, isTelegram = false }) => {
  const listMessengers = useMemo(() => {
    const iconLogoTelegram = isTelegram ? [IconLogoTelegram] : [];
    const iconLogoWhatsApp = isWhatsApp ? [IconLogoWhatsApp] : [];
    const iconLogoViber = isViber ? [IconLogoViber] : [];
    return [...iconLogoViber, ...iconLogoWhatsApp, ...iconLogoTelegram];
  }, [isViber, isWhatsApp, isTelegram]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
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

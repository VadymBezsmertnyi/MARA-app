import React, { FunctionComponent, useContext, useState } from "react";
import { TouchableOpacity, View } from "react-native";

// providers
import { localesContext } from "../../../../../localization/localization.provider";

// components
import { Input } from "../../../../components/Input/Input";
import { IconTabMap } from "../../../../icons/components";

// styles
import { styles } from "./InputLocationModal.styles";

export const InputLocationModal: FunctionComponent = () => {
  const [value, setValue] = useState("");
  const { i18n } = useContext(localesContext);
  return (
    <View style={styles.container}>
      <Input
        placeholder={i18n._("Enter the address")}
        label={i18n._("The place of the event")}
        defaultValue={value}
        onChange={setValue}
        InputIcon={
          <TouchableOpacity>
            <IconTabMap width={41} height={32} />
          </TouchableOpacity>
        }
      />
    </View>
  );
};

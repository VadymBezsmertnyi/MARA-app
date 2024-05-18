import React, { FunctionComponent, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";

// icons
import {
  IconSort,
  IconFilter,
  IconWrapItemsGradient,
  IconColumnItemsGradient,
} from "../../../../../icons/components";

// styles
import { styles } from "./HeaderFilters.styles";

type HeaderFiltersProps = {
  isWrap?: boolean;
  setIsWrap?: (value: boolean) => void;
  onPressFilter: () => void;
  onPressSort: () => void;
};

export const HeaderFilters: FunctionComponent<HeaderFiltersProps> = ({
  isWrap,
  setIsWrap,
  onPressFilter,
  onPressSort,
}) => {
  // TODO: will do later
  const isFilter = false;
  const IconShowType = useMemo(
    () =>
      isWrap ? (
        <IconWrapItemsGradient width={20} height={20} />
      ) : (
        <IconColumnItemsGradient width={20} height={20} />
      ),
    [isWrap]
  );

  return (
    <View style={styles.container}>
      {setIsWrap ? (
        <TouchableOpacity
          onPress={() => {
            setIsWrap(!isWrap);
          }}
        >
          {IconShowType}
        </TouchableOpacity>
      ) : null}
      {isFilter && (
        <TouchableOpacity onPress={onPressSort}>
          <IconSort width={20} height={20} />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={onPressFilter}>
        <IconFilter width={20} height={20} />
      </TouchableOpacity>
    </View>
  );
};

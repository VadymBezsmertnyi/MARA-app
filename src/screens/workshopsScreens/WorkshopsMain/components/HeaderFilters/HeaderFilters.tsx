import React, { FunctionComponent, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";

// icons
import {
  IconSort,
  IconFilter,
  IconWrapItemsGradient,
  IconColumnItemsGradient,
  IconPlus,
} from "../../../../../icons/components";

// styles
import { styles } from "./HeaderFilters.styles";
import colors from "../../../../../../styles/colors";

type HeaderFiltersProps = {
  isWrap?: boolean;
  setIsWrap?: (value: boolean) => void;
  onPressFilter: () => void;
  onPressSort: () => void;
  onPressAddWorkshop?: () => void;
  isAddButtonDisabled?: boolean;
  addButtonAccessibilityLabel?: string;
  showFilters?: boolean;
};

export const HeaderFilters: FunctionComponent<HeaderFiltersProps> = ({
  isWrap,
  setIsWrap,
  onPressFilter,
  onPressSort,
  onPressAddWorkshop,
  isAddButtonDisabled = false,
  addButtonAccessibilityLabel,
  showFilters = true,
}) => {
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
      {showFilters && setIsWrap ? (
        <TouchableOpacity
          onPress={() => {
            setIsWrap(!isWrap);
          }}
        >
          {IconShowType}
        </TouchableOpacity>
      ) : null}
      {showFilters && (
        <TouchableOpacity onPress={onPressSort}>
          <IconSort width={20} height={20} />
        </TouchableOpacity>
      )}
      {showFilters && (
        <TouchableOpacity onPress={onPressFilter}>
          <IconFilter width={20} height={20} />
        </TouchableOpacity>
      )}
      {onPressAddWorkshop && (
        <TouchableOpacity
          disabled={isAddButtonDisabled}
          onPress={onPressAddWorkshop}
          accessibilityLabel={addButtonAccessibilityLabel}
          style={[styles.addButton, { opacity: isAddButtonDisabled ? 0.5 : 1 }]}
        >
          <IconPlus width={20} height={20} fill={colors.blazeOrange} />
        </TouchableOpacity>
      )}
    </View>
  );
};

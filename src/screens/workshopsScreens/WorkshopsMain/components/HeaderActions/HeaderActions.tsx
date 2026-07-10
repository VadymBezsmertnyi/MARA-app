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
import { styles } from "./HeaderActions.styles";
import colors from "../../../../../../styles/colors";

type HeaderActionsProps = {
  isWrap?: boolean;
  setIsWrap?: (value: boolean) => void;
  onPressFilter: () => void;
  onPressSort: () => void;
  onPressAddWorkshop?: () => void;
  isAddButtonDisabled?: boolean;
  addButtonAccessibilityLabel?: string;
  showFilters?: boolean;
  hasActiveSort?: boolean;
};

export const HeaderActions: FunctionComponent<HeaderActionsProps> = ({
  isWrap,
  setIsWrap,
  onPressFilter,
  onPressSort,
  onPressAddWorkshop,
  isAddButtonDisabled = false,
  addButtonAccessibilityLabel,
  showFilters = true,
  hasActiveSort = false,
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
        <View style={styles.sortButtonContainer}>
          <TouchableOpacity onPress={onPressSort}>
            <IconSort width={20} height={20} />
          </TouchableOpacity>
          {hasActiveSort && <View style={styles.sortIndicator} />}
        </View>
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

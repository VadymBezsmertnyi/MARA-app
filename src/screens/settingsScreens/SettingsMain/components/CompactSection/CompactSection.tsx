import React, { FunctionComponent } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// styles
import { styles } from "../../SettingsMain.styles";

export type CompactSectionItem = {
  id: string;
  name: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  count?: number | string;
  color?: string;
  isRating?: boolean;
  subItems?: Array<{
    label: string;
    value: number;
    icon: keyof typeof MaterialIcons.glyphMap;
    color: string;
  }>;
};

export type CompactSectionProps = {
  title: string;
  items: CompactSectionItem[];
  onPress?: () => void;
  sectionLoading?: boolean;
};

export const CompactSectionComponent: FunctionComponent<CompactSectionProps> = ({
  title,
  items,
  onPress,
  sectionLoading,
}) => {
  return (
    <View style={styles.compactSectionContainer}>
      <Text style={styles.compactSectionTitle}>{title}</Text>
      {sectionLoading ? (
        <View style={styles.compactLoadingContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.compactLoadingText}>Loading...</Text>
        </View>
      ) : (
        <View style={styles.compactItemsContainer}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={onPress}
              disabled={!onPress}
              style={styles.compactItemTouchable}
            >
              <View style={styles.compactItem}>
                <View style={styles.compactItemLeft}>
                  {item.icon && (
                    <MaterialIcons
                      name={item.icon}
                      size={20}
                      color={item.color || "#666"}
                      style={styles.compactItemIcon}
                    />
                  )}
                  <Text style={styles.compactItemText}>{item.name}</Text>
                </View>
                <View style={styles.compactItemRight}>
                  {item.isRating ? (
                    <View style={styles.compactRatingContainer}>
                      <Text style={styles.compactItemCount}>{item.count}</Text>
                      <MaterialIcons name="star" size={16} color="#FFD700" />
                    </View>
                  ) : item.count !== undefined ? (
                    <Text style={styles.compactItemCount}>{item.count}</Text>
                  ) : null}
                  {onPress && (
                    <MaterialIcons
                      name="arrow-forward-ios"
                      size={12}
                      color="#666"
                    />
                  )}
                </View>
              </View>
              {item.subItems && (
                <View style={styles.compactSubItemsContainer}>
                  {item.subItems.map((subItem, index) => (
                    <View key={index} style={styles.compactSubItem}>
                      <MaterialIcons
                        name={subItem.icon}
                        size={14}
                        color={subItem.color}
                        style={styles.compactSubItemIcon}
                      />
                      <Text style={styles.compactSubItemText}>
                        {subItem.label}: {subItem.value}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

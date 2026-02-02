import React, { FunctionComponent } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// styles
import { styles } from "./CompactSection.styles";

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

export const CompactSectionComponent: FunctionComponent<
  CompactSectionProps
> = ({ title, items, onPress, sectionLoading }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {sectionLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <View style={styles.itemsContainer}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={onPress}
              disabled={!onPress}
              style={styles.itemTouchable}
            >
              <View style={styles.item}>
                <View style={styles.itemLeft}>
                  {item.icon && (
                    <MaterialIcons
                      name={item.icon}
                      size={20}
                      color={item.color || "#666"}
                      style={styles.itemIcon}
                    />
                  )}
                  <Text style={styles.itemText}>{item.name}</Text>
                </View>
                <View style={styles.itemRight}>
                  {item.isRating ? (
                    <View style={styles.ratingContainer}>
                      <Text style={styles.itemCount}>{item.count}</Text>
                      <MaterialIcons name="star" size={16} color="#FFD700" />
                    </View>
                  ) : item.count !== undefined ? (
                    <Text style={styles.itemCount}>{item.count}</Text>
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
                <View style={styles.subItemsContainer}>
                  {item.subItems.map((subItem, index) => (
                    <View key={index} style={styles.subItem}>
                      <MaterialIcons
                        name={subItem.icon}
                        size={14}
                        color={subItem.color}
                        style={styles.subItemIcon}
                      />
                      <Text style={styles.subItemText}>
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

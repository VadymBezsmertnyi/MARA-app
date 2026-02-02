import React, { FunctionComponent } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// styles
import { styles } from "./SectionItem.styles";

export type SectionItem = {
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

export type RenderSectionItemProps = {
  title: string;
  items: SectionItem[];
  onPress?: () => void;
  sectionLoading?: boolean;
};

export const SectionItemComponent: FunctionComponent<
  RenderSectionItemProps
> = ({ title, items, onPress, sectionLoading }) => {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {sectionLoading ? (
          <ActivityIndicator size="small" color="#007AFF" />
        ) : null}
      </View>
      {sectionLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#666" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          disabled={!onPress}
          style={styles.sectionTouchable}
        >
          <View style={styles.sectionItems}>
            {items.slice(0, 4).map((item) => (
              <View key={item.id} style={styles.sectionItem}>
                <View style={styles.itemLeft}>
                  {item.icon && (
                    <MaterialIcons
                      name={item.icon}
                      size={20}
                      color={item.color || "#666"}
                      style={styles.itemIcon}
                    />
                  )}
                  <View style={styles.itemContent}>
                    <Text style={styles.itemText}>{item.name}</Text>
                    {item.subItems && (
                      <View style={styles.subItemsContainer}>
                        {item.subItems.map((subItem, index) => (
                          <View key={index} style={styles.subItem}>
                            <MaterialIcons
                              name={subItem.icon}
                              size={16}
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
                  </View>
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
            ))}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

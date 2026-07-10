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
        <View style={styles.contentContainer}>
          <View style={styles.topSection}>
            <View style={styles.leftColumn}>
              {items
                .filter((item) => item.name === "Workshops")
                .map((item) => (
                  <View key={item.id} style={styles.categoryContainer}>
                    <View style={styles.categoryHeader}>
                      {item.icon && (
                        <MaterialIcons
                          name={item.icon}
                          size={20}
                          color={item.color || "#666"}
                          style={styles.categoryIcon}
                        />
                      )}
                      <Text style={styles.categoryText}>{item.name}</Text>
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
                  </View>
                ))}
            </View>
            <View style={styles.rightColumn}>
              {items
                .filter((item) => item.name === "Events")
                .map((item) => (
                  <View key={item.id} style={styles.categoryContainer}>
                    <View style={styles.categoryHeader}>
                      {item.icon && (
                        <MaterialIcons
                          name={item.icon}
                          size={20}
                          color={item.color || "#666"}
                          style={styles.categoryIcon}
                        />
                      )}
                      <Text style={styles.categoryText}>{item.name}</Text>
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
                  </View>
                ))}
            </View>
          </View>
          <View style={styles.bottomSection}>
            {items
              .filter((item) => item.name === "Comments")
              .map((item) => (
                <View key={item.id} style={styles.bottomItem}>
                  <View style={styles.bottomItemLeft}>
                    {item.icon && (
                      <MaterialIcons
                        name={item.icon}
                        size={20}
                        color={item.color || "#666"}
                        style={styles.bottomItemIcon}
                      />
                    )}
                    <Text style={styles.bottomItemText}>{item.name}</Text>
                  </View>
                  <Text style={styles.bottomItemCount}>{item.count}</Text>
                </View>
              ))}
            {items
              .filter((item) => item.name === "Rating")
              .map((item) => (
                <View key={item.id} style={styles.bottomItem}>
                  <View style={styles.bottomItemLeft}>
                    {item.icon && (
                      <MaterialIcons
                        name={item.icon}
                        size={20}
                        color={item.color || "#666"}
                        style={styles.bottomItemIcon}
                      />
                    )}
                    <Text style={styles.bottomItemText}>{item.name}</Text>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.bottomItemCount}>{item.count}</Text>
                    <MaterialIcons name="star" size={16} color="#FFD700" />
                  </View>
                </View>
              ))}
          </View>
        </View>
      )}
    </View>
  );
};

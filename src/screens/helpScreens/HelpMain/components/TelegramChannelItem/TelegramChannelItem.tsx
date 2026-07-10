import React, { FunctionComponent, useMemo } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// types
import { TTelegramChannel } from "../../../../../storeRedux/apis/telegram-channels/telegram-channels.types";

// styles
import { styles } from "./TelegramChannelItem.styles";

type TelegramChannelItemProps = {
  channel: TTelegramChannel;
  onPress?: (channel: TTelegramChannel) => void;
  onReport?: (channelId: string) => void;
};

export const TelegramChannelItem: FunctionComponent<
  TelegramChannelItemProps
> = ({ channel, onPress, onReport }) => {
  const { i18n } = useLocalesProvider();

  const handlePress = () => {
    if (onPress) onPress(channel);
  };

  const handleReport = () => {
    if (onReport)
      Alert.alert(
        i18n._("Report Channel"),
        i18n._("Are you sure you want to report this channel?"),
        [
          { text: i18n._("Cancel"), style: "cancel" },
          {
            text: i18n._("Report"),
            style: "destructive",
            onPress: () => onReport(channel._id),
          },
        ]
      );
  };

  const categoryColors = useMemo(() => {
    switch (channel.category) {
      case "moto":
        return { bg: "#FFE4E1", text: "#DC143C" };
      case "auto":
        return { bg: "#E6F3FF", text: "#0066CC" };
      case "community":
        return { bg: "#F0FFF0", text: "#228B22" };
      case "dispute":
        return { bg: "#FFF8DC", text: "#DAA520" };
      default:
        return { bg: "#F5F5F5", text: "#666666" };
    }
  }, [channel.category]);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{channel.name}</Text>
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: categoryColors.bg },
            ]}
          >
            <Text style={[styles.categoryText, { color: categoryColors.text }]}>
              {channel.category}
            </Text>
          </View>
        </View>
        <View style={styles.verificationContainer}>
          {channel.verified && (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>✓ {i18n._("Verified")}</Text>
            </View>
          )}
          {channel.aiVerified && (
            <View style={styles.aiVerifiedBadge}>
              <Text style={styles.aiVerifiedText}>{i18n._("AI Verified")}</Text>
            </View>
          )}
        </View>
      </View>

      {channel.description && (
        <Text style={styles.description} numberOfLines={2}>
          {channel.description}
        </Text>
      )}

      <View style={styles.footer}>
        <View style={styles.locationInfo}>
          <Text style={styles.locationText}>
            📱 {i18n._("Telegram Channel")}
          </Text>
          <Text style={styles.locationText}>
            👥 {channel.reportCount} {i18n._("reports")}
          </Text>
        </View>
        <TouchableOpacity style={styles.reportButton} onPress={handleReport}>
          <Text style={styles.reportButtonText}>⚠️ {i18n._("Report")}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

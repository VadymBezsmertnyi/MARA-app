import React, { FunctionComponent, useMemo } from "react";
import { Text, View } from "react-native";
import dayjs from "dayjs";

// types
import { TTimelineItem } from "../../../../../storeRedux/apis/events/events.types";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// helps
import { getTimeFromMilliseconds } from "../../../../../helps/helps";

// styles
import { styles } from "./TimelineSection.styles";

type TimelineSectionProps = {
  timeline?: TTimelineItem[];
};

export const TimelineSection: FunctionComponent<TimelineSectionProps> = ({
  timeline = [],
}) => {
  const { i18n } = useLocalesProvider();
  const timelineItems = useMemo(
    () =>
      timeline.length ? [...timeline].sort((a, b) => a.start - b.start) : [],
    [timeline]
  );
  const timelineGroups = useMemo(() => {
    const grouped = new Map<
      string,
      { label: string; items: TTimelineItem[] }
    >();
    timelineItems.forEach((item) => {
      const date = dayjs(item.start);
      const key = date.format("YYYY-MM-DD");
      if (!grouped.has(key)) {
        grouped.set(key, {
          label: `${date.format("D MMMM YYYY")} - ${date.format("dddd")}`,
          items: [],
        });
      }
      grouped.get(key)?.items.push(item);
    });
    return Array.from(grouped.values());
  }, [timelineItems]);

  if (!timelineItems.length) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n._("Timeline")}</Text>
      <View style={styles.list}>
        {timelineGroups.map((group, groupIndex) => (
          <View key={`timeline-group-${groupIndex}`} style={styles.group}>
            <Text style={styles.groupTitle}>{group.label}</Text>
            {group.items.map((item, index) => {
              const startTime = getTimeFromMilliseconds(item.start);
              const finishTime = item.finish
                ? getTimeFromMilliseconds(item.finish)
                : null;
              return (
                <View
                  key={`timeline-${groupIndex}-${index}-${item.start}`}
                  style={styles.row}
                >
                  <Text style={styles.time}>
                    {finishTime ? `${startTime} — ${finishTime}` : startTime}
                  </Text>
                  <View style={styles.content}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    {item.description ? (
                      <Text style={styles.description}>{item.description}</Text>
                    ) : null}
                  </View>
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

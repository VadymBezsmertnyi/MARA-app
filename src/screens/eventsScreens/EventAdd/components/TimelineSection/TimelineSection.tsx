import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import dayjs from "dayjs";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// components
import { Input } from "../../../../../components/Input/Input";
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";
import { ModalUniversal } from "../../../../../components/ModalUniversal/ModalUniversal";
import { DatePicker } from "../DatePicker/DatePicker";

// helps
import { combineDateAndTime } from "../../../../../helps/helps";

// styles
import { styles } from "./TimelineSection.styles";
import colors from "../../../../../../styles/colors";

export type TimelineItemDraft = {
  id: string;
  title: string;
  description: string;
  start: number;
  finish: number | null;
};

type TimelineSectionProps = {
  timelineItems: TimelineItemDraft[];
  setTimelineItems: React.Dispatch<React.SetStateAction<TimelineItemDraft[]>>;
  eventRange: { min: number; max: number };
};

export const validateTimelineItems = (
  items: TimelineItemDraft[],
  eventRange: { min: number; max: number },
  i18n: { _: (text: string) => string }
) => {
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    if (!item.title.trim()) {
      Toast.show({
        type: "error",
        text1: i18n._("Error"),
        text2: i18n._("Please add a title to each timeline item"),
      });
      return false;
    }
    if (item.start < eventRange.min || item.start > eventRange.max) {
      Toast.show({
        type: "error",
        text1: i18n._("Error"),
        text2: i18n._("Timeline item start time is outside event dates"),
      });
      return false;
    }
    if (item.finish !== null) {
      if (item.finish < item.start) {
        Toast.show({
          type: "error",
          text1: i18n._("Error"),
          text2: i18n._("Timeline item finish must be after start"),
        });
        return false;
      }
      if (item.finish > eventRange.max) {
        Toast.show({
          type: "error",
          text1: i18n._("Error"),
          text2: i18n._("Timeline item finish time is outside event dates"),
        });
        return false;
      }
    }
  }
  return true;
};

export const TimelineSection: FunctionComponent<TimelineSectionProps> = ({
  timelineItems,
  setTimelineItems,
  eventRange,
}) => {
  const { i18n } = useLocalesProvider();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date(eventRange.min));
  const [startTime, setStartTime] = useState<Date>(new Date(eventRange.min));
  const [finishDate, setFinishDate] = useState<Date>(new Date(eventRange.min));
  const [finishTime, setFinishTime] = useState<Date>(new Date(eventRange.min));
  const [hasFinish, setHasFinish] = useState(false);

  const minDate = useMemo(() => new Date(eventRange.min), [eventRange.min]);
  const maxDate = useMemo(() => new Date(eventRange.max), [eventRange.max]);

  const clampToRange = (value: number) =>
    Math.min(Math.max(value, eventRange.min), eventRange.max);

  const createDraftId = () => `${Date.now()}-${Math.random()}`;

  const openModalWithItem = (item?: TimelineItemDraft) => {
    if (item) {
      setEditingId(item.id);
      setTitle(item.title);
      setDescription(item.description);
      setStartDate(new Date(item.start));
      setStartTime(new Date(item.start));
      const finishTimestamp = item.finish ?? item.start;
      setFinishDate(new Date(finishTimestamp));
      setFinishTime(new Date(finishTimestamp));
      setHasFinish(item.finish !== null);
    } else {
      const startTimestamp = clampToRange(eventRange.min);
      setEditingId(null);
      setTitle("");
      setDescription("");
      setStartDate(new Date(startTimestamp));
      setStartTime(new Date(startTimestamp));
      setFinishDate(new Date(startTimestamp));
      setFinishTime(new Date(startTimestamp));
      setHasFinish(false);
    }
    setIsModalVisible(true);
  };

  const handleSaveItem = () => {
    if (!title.trim()) {
      Toast.show({
        type: "error",
        text1: i18n._("Error"),
        text2: i18n._("Please add a title to the timeline item"),
      });
      return;
    }
    const startTimestamp = clampToRange(
      combineDateAndTime(startDate, startTime).getTime()
    );
    let finishTimestamp: number | null = null;
    if (hasFinish) {
      finishTimestamp = clampToRange(
        combineDateAndTime(finishDate, finishTime).getTime()
      );
      if (finishTimestamp < startTimestamp) finishTimestamp = startTimestamp;
    }

    const nextItem: TimelineItemDraft = {
      id: editingId || createDraftId(),
      title: title.trim(),
      description: description.trim(),
      start: startTimestamp,
      finish: hasFinish ? finishTimestamp : null,
    };

    setTimelineItems((prev) => {
      if (editingId)
        return prev.map((item) => (item.id === editingId ? nextItem : item));
      return [...prev, nextItem];
    });
    setIsModalVisible(false);
  };

  useEffect(() => {
    setTimelineItems((prev) =>
      prev.map((item) => {
        const clampedStart = clampToRange(item.start);
        let clampedFinish =
          item.finish !== null ? clampToRange(item.finish) : null;
        if (clampedFinish !== null && clampedFinish < clampedStart)
          clampedFinish = clampedStart;
        if (clampedStart === item.start && clampedFinish === item.finish)
          return item;
        return { ...item, start: clampedStart, finish: clampedFinish };
      })
    );
  }, [eventRange.min, eventRange.max]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{i18n._("Timeline")}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => openModalWithItem()}
        >
          <MaterialIcons name="add" size={18} color={colors.grayFuscous} />
          <Text style={styles.addButtonText}>{i18n._("Add item")}</Text>
        </TouchableOpacity>
      </View>

      {timelineItems.length === 0 && (
        <Text style={styles.emptyText}>{i18n._("No timeline items yet")}</Text>
      )}

      {timelineItems.map((item, index) => {
        const timeLabel =
          item.finish !== null
            ? `${dayjs(item.start).format("DD.MM HH:mm")} — ${dayjs(
                item.finish
              ).format("DD.MM HH:mm")}`
            : dayjs(item.start).format("DD.MM HH:mm");
        return (
          <View key={item.id} style={styles.itemCard}>
            <TouchableOpacity
              style={styles.itemInfo}
              onPress={() => openModalWithItem(item)}
            >
              <Text style={styles.itemTitle}>
                {item.title.trim() || `${i18n._("Step")} ${index + 1}`}
              </Text>
              <Text style={styles.itemTime}>{timeLabel}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setTimelineItems((prev) =>
                  prev.filter((timelineItem) => timelineItem.id !== item.id)
                )
              }
            >
              <MaterialIcons name="delete" size={20} color={colors.errorRed} />
            </TouchableOpacity>
          </View>
        );
      })}

      <ModalUniversal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>{i18n._("Timeline item")}</Text>
          <Input
            isRegular
            placeholder={i18n._("Title")}
            label={i18n._("Title")}
            value={title}
            onChange={setTitle}
          />
          <Input
            placeholder={i18n._("Description (optional)")}
            label={i18n._("Description")}
            value={description}
            onChange={setDescription}
            customStyles={styles.modalDescription}
          />
          <View style={styles.pickerRow}>
            <View style={styles.pickerItem}>
              <DatePicker
                isRegular
                value={startDate}
                label={i18n._("Start")}
                onChange={(_k, d) => {
                  if (!d) return;
                  setStartDate(d);
                  const nextStart = combineDateAndTime(d, startTime).getTime();
                  if (
                    hasFinish &&
                    nextStart >
                      combineDateAndTime(finishDate, finishTime).getTime()
                  ) {
                    setFinishDate(d);
                    setFinishTime(d);
                  }
                }}
                mode="date"
                minimumDate={minDate}
                maximumDate={maxDate}
              />
            </View>
            <View style={styles.pickerItem}>
              <DatePicker
                value={startTime}
                onChange={(_k, d) => {
                  if (!d) return;
                  setStartTime(d);
                }}
                mode="time"
                minimumDate={minDate}
                maximumDate={maxDate}
              />
            </View>
          </View>
          {hasFinish && (
            <View style={styles.pickerRow}>
              <View style={styles.pickerItem}>
                <DatePicker
                  value={finishDate}
                  label={i18n._("Finish")}
                  onChange={(_k, d) => {
                    if (!d) return;
                    setFinishDate(d);
                  }}
                  mode="date"
                  minimumDate={minDate}
                  maximumDate={maxDate}
                />
              </View>
              <View style={styles.pickerItem}>
                <DatePicker
                  value={finishTime}
                  onChange={(_k, d) => {
                    if (!d) return;
                    setFinishTime(d);
                  }}
                  mode="time"
                  minimumDate={minDate}
                  maximumDate={maxDate}
                />
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.finishToggle}
            onPress={() => setHasFinish((prev) => !prev)}
          >
            <Text style={styles.finishToggleText}>
              {hasFinish
                ? i18n._("Remove finish time")
                : i18n._("Add finish time")}
            </Text>
          </TouchableOpacity>

          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.cancelText}>{i18n._("Cancel")}</Text>
            </TouchableOpacity>
            <ButtonCustom
              title={i18n._("Save")}
              onSubmit={handleSaveItem}
              styleContainer={styles.saveButton}
              styleButton={styles.saveButton}
            />
          </View>
        </View>
      </ModalUniversal>
    </View>
  );
};

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

type FormStateType = {
  title: string;
  description: string;
  startDate: Date;
  startTime: Date;
  finishDate: Date;
  finishTime: Date;
  hasFinish: boolean;
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
  const [form, setForm] = useState<FormStateType>({
    title: "",
    description: "",
    startDate: new Date(eventRange.min),
    startTime: new Date(eventRange.min),
    finishDate: new Date(eventRange.min),
    finishTime: new Date(eventRange.min),
    hasFinish: false,
  });

  const minDate = useMemo(() => new Date(eventRange.min), [eventRange.min]);
  const maxDate = useMemo(() => new Date(eventRange.max), [eventRange.max]);

  const clampToRange = (value: number) =>
    Math.min(Math.max(value, eventRange.min), eventRange.max);

  const createDraftId = () => `${Date.now()}-${Math.random()}`;

  const openModalWithItem = (item?: TimelineItemDraft) => {
    if (item) {
      setEditingId(item.id);
      setForm((prev) => ({
        ...prev,
        title: item.title,
        description: item.description,
        startDate: new Date(item.start),
        startTime: new Date(item.start),
      }));
      const finishTimestamp = item.finish ?? item.start;
      setForm((prev) => ({
        ...prev,
        finishDate: new Date(finishTimestamp),
        finishTime: new Date(finishTimestamp),
        hasFinish: item.finish !== null,
      }));
    } else {
      const startTimestamp = clampToRange(eventRange.min);
      setEditingId(null);
      setForm({
        title: "",
        description: "",
        startDate: new Date(startTimestamp),
        startTime: new Date(startTimestamp),
        finishDate: new Date(startTimestamp),
        finishTime: new Date(startTimestamp),
        hasFinish: false,
      });
    }
    setIsModalVisible(true);
  };

  const handleSaveItem = () => {
    if (!form.title.trim()) {
      Toast.show({
        type: "error",
        text1: i18n._("Error"),
        text2: i18n._("Please add a title to the timeline item"),
      });
      return;
    }
    const startTimestamp = clampToRange(
      combineDateAndTime(form.startDate, form.startTime).getTime()
    );
    let finishTimestamp: number | null = null;
    if (form.hasFinish) {
      finishTimestamp = clampToRange(
        combineDateAndTime(form.finishDate, form.finishTime).getTime()
      );
      if (finishTimestamp < startTimestamp) finishTimestamp = startTimestamp;
    }

    const nextItem: TimelineItemDraft = {
      id: editingId || createDraftId(),
      title: form.title.trim(),
      description: form.description.trim(),
      start: startTimestamp,
      finish: form.hasFinish ? finishTimestamp : null,
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
            value={form.title}
            onChange={(value) => setForm((prev) => ({ ...prev, title: value }))}
          />
          <Input
            placeholder={i18n._("Description (optional)")}
            label={i18n._("Description")}
            value={form.description}
            onChange={(value) =>
              setForm((prev) => ({ ...prev, description: value }))
            }
            customStyles={styles.modalDescription}
          />
          <View style={styles.pickerRow}>
            <View style={styles.pickerItem}>
              <DatePicker
                isRegular
                value={form.startDate}
                label={i18n._("Start")}
                onChange={(_k, d) => {
                  if (!d) return;
                  setForm((prev) => ({ ...prev, startDate: d }));
                  const nextStart = combineDateAndTime(
                    d,
                    form.startTime
                  ).getTime();
                  if (
                    form.hasFinish &&
                    nextStart >
                      combineDateAndTime(
                        form.finishDate,
                        form.finishTime
                      ).getTime()
                  ) {
                    setForm((prev) => ({
                      ...prev,
                      finishDate: d,
                      finishTime: d,
                    }));
                  }
                }}
                mode="date"
                minimumDate={minDate}
                maximumDate={maxDate}
              />
            </View>
            <View style={styles.pickerItem}>
              <DatePicker
                value={form.startTime}
                onChange={(_k, d) => {
                  if (!d) return;
                  setForm((prev) => ({ ...prev, startTime: d }));
                }}
                mode="time"
                minimumDate={minDate}
                maximumDate={maxDate}
              />
            </View>
          </View>
          {form.hasFinish && (
            <View style={styles.pickerRow}>
              <View style={styles.pickerItem}>
                <DatePicker
                  value={form.finishDate}
                  label={i18n._("Finish")}
                  onChange={(_k, d) => {
                    if (!d) return;
                    setForm((prev) => ({ ...prev, finishDate: d }));
                  }}
                  mode="date"
                  minimumDate={minDate}
                  maximumDate={maxDate}
                />
              </View>
              <View style={styles.pickerItem}>
                <DatePicker
                  value={form.finishTime}
                  onChange={(_k, d) => {
                    if (!d) return;
                    setForm((prev) => ({ ...prev, finishTime: d }));
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
            onPress={() =>
              setForm((prev) => ({ ...prev, hasFinish: !prev.hasFinish }))
            }
          >
            <Text style={styles.finishToggleText}>
              {form.hasFinish
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

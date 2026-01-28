import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Shadow } from "react-native-shadow-2";

// types
import { TEvent } from "../../../../../storeRedux/apis/events/events.types";

// redux
import { useUserSelector } from "../../../../../storeRedux/apis/user/slice";
import {
  useAddEventCommentMutation,
  useChangeEventCommentMutation,
} from "../../../../../storeRedux/api";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// components
import { Input } from "../../../../../components/Input/Input";
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";

// icons
import { IconStar } from "../../../../../icons/components";

// styles
import { styles } from "./ModalComment.styles";
import colors from "../../../../../../styles/colors";

type ModalCommentProps = {
  selectEvent: TEvent | null;
  onClose: () => void;
};

export const ModalComment: FunctionComponent<ModalCommentProps> = ({
  selectEvent,
  onClose,
}) => {
  const { i18n } = useLocalesProvider();
  const { userData } = useUserSelector();
  const [addCommentMutation] = useAddEventCommentMutation();
  const [changeCommentMutation] = useChangeEventCommentMutation();
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [errorMessages, setErrorMessages] = useState<Record<
    string,
    string
  > | null>(null);
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);
  const commentUser = useMemo(
    () =>
      selectEvent?.comments.find(
        (comment) => comment.userId === userData?._id
      ) || null,
    []
  );

  const clearKeyError = (key: string) => {
    if (errorMessages && key in errorMessages) {
      const { [key]: _, ...otherErrorMessage } = errorMessages;
      if (Object.keys(otherErrorMessage).length <= 2) setErrorMessages(null);
      else setErrorMessages(otherErrorMessage);
    }
  };

  const checkEnterData = () => {
    const errorsObject = {
      ...((userName.length < 3 || userName.length > 40) && {
        title: i18n._(
          "The text must contain a minimum of 3 and a maximum of 40 characters."
        ),
      }),
      ...((description.length < 10 || description.length > 2000) && {
        description: i18n._(
          "The text must contain a minimum of 10 and a maximum of 2000 characters."
        ),
      }),
      ...(rating === 0 && {
        rating: i18n._(
          "The text must contain a minimum of 10 and a maximum of 2000 characters."
        ),
      }),
    };
    const isError = Object.keys(errorsObject).length > 0;
    if (isError) setErrorMessages(errorsObject);
    else setErrorMessages(null);
    return isError;
  };

  const onSubmit = async () => {
    const isError = checkEnterData();
    if (!isError && selectEvent && userData) {
      const newComment = {
        userId: userData._id,
        description,
        userName,
        rating,
        dateCreate: new Date().getTime(),
        dateUpdate: new Date().getTime(),
      };
      const result = commentUser
        ? await changeCommentMutation({
            body: {
              _id: commentUser._id,
              idEvent: selectEvent._id,
              userId: userData._id,
              userName: newComment.userName,
              description: newComment.description,
              rating: newComment.rating,
            },
          })
        : await addCommentMutation({
            body: {
              idEvent: selectEvent._id,
              userId: userData._id,
              userName: newComment.userName,
              description: newComment.description,
              rating: newComment.rating,
            },
          });
      if (result.data?.event) onClose();
    }
  };

  useEffect(() => {
    if (commentUser) {
      setUserName(commentUser.userName);
      setDescription(commentUser.description);
      setRating(commentUser.rating);
    }
    if (userData) setUserName(`${userData.firstName} ${userData.lastName}`);
  }, [commentUser]);

  return (
    <Modal
      visible={true}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
          style={styles.modalContent}
        >
          <Shadow stretch>
            <View style={styles.containerModal}>
              <ScrollView>
                <View style={styles.container}>
                  <View style={styles.containerHeader}>
                    <Text style={styles.titleHeader}>
                      {i18n._("Leave a review")}
                    </Text>
                  </View>
                  <View style={styles.containerBody}>
                    <Input
                      label={i18n._("Name")}
                      placeholder={i18n._("Enter your name")}
                      value={userName}
                      onChange={(value) => {
                        clearKeyError("userName");
                        setUserName(value);
                      }}
                      errorMessage={errorMessages?.userName}
                    />
                    <Input
                      placeholder={i18n._("Add a description about the event")}
                      label={i18n._("Event description")}
                      value={description}
                      onChange={(value) => {
                        clearKeyError("description");
                        setDescription(value);
                      }}
                      containerStyle={styles.containerStyle}
                      customStyles={styles.customStylesInput}
                      errorMessage={errorMessages?.description}
                    />
                    <View>
                      <View style={styles.containerStars}>
                        {stars.map((star) => (
                          <TouchableOpacity
                            key={`star-${star}-comment`}
                            onPress={() => {
                              clearKeyError("rating");
                              setRating(star);
                            }}
                          >
                            {rating >= star ? (
                              <IconStar
                                width={32}
                                height={32}
                                fill={colors.yellow}
                                stroke={colors.yellow}
                              />
                            ) : (
                              <IconStar
                                width={32}
                                height={32}
                                stroke={colors.grayCloudy}
                              />
                            )}
                          </TouchableOpacity>
                        ))}
                      </View>
                      {errorMessages?.rating ? (
                        <Text style={styles.errorMessage}>
                          {errorMessages.rating}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                  <View style={styles.containerButton}>
                    <ButtonCustom
                      disabled={
                        errorMessages
                          ? Object.values(errorMessages).length > 0
                          : false
                      }
                      title={i18n._("Publish")}
                      onSubmit={onSubmit}
                    />
                  </View>
                </View>
                <View style={styles.containerEmpty} />
              </ScrollView>
            </View>
          </Shadow>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

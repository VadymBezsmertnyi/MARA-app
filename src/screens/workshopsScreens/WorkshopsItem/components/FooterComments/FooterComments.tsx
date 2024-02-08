import React, { FunctionComponent, useContext, useMemo } from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";
import { Trans } from "@lingui/macro";

// types
import { CommentType } from "../../../../../providers/WorkshopsProvider/WorkshopsProvider.types";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";

// components
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";

// helps
import { dateToNMY } from "../../../../../helps/helps";

// icons
import { IconStar } from "../../../../../icons/components";

// styles
import { styles } from "./FooterComments.styles";
import colors from "../../../../../../styles/colors";

type FooterCommentsProps = {
  data: CommentType[];
  isCommentUser: boolean;
  rating: number;
  setIsShowModalComment: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FooterComments: FunctionComponent<FooterCommentsProps> = ({
  data,
  isCommentUser,
  rating,
  setIsShowModalComment,
}) => {
  const { i18n } = useContext(localesContext);
  const isComments = useMemo(() => data.length > 0, [data]);

  const renderItem: ListRenderItem<CommentType> = ({ item }) => {
    const stars = Array.from({ length: item.rating }, (_, index) => index);

    return (
      <View style={styles.containerComment}>
        <View style={styles.headerComment}>
          <Text style={styles.titleName}>{item.userName}</Text>
          <Text style={styles.titleDate}>
            {dateToNMY(new Date(item.dateUpdate))}
          </Text>
        </View>
        <View style={styles.starsContainer}>
          <View style={styles.stars}>
            {stars.map((star) => (
              <IconStar
                key={`star-${star}-comment-${item.id}`}
                width={12}
                height={12}
                fill={colors.yellow}
              />
            ))}
          </View>
          <Text style={styles.titleStars}>{item.rating}</Text>
        </View>
        <Text style={styles.comment}>{item.description}</Text>
      </View>
    );
  };

  const onShowWriteComment = () => {
    setIsShowModalComment(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerReviews}>
        <Text style={styles.titleReviews}>
          <Trans>Reviews:</Trans>
        </Text>
        <View style={styles.containerOtherReviews}>
          {isComments ? (
            <View style={styles.containerStars}>
              <IconStar width={32} height={32} fill={colors.yellow} />
              <Text style={styles.titleStar}>{rating.toFixed(1)}</Text>
            </View>
          ) : null}
          <ButtonCustom
            title={
              !isComments
                ? i18n._("Draft the first review")
                : isCommentUser
                ? i18n._("Change a review")
                : i18n._("Write a review")
            }
            onSubmit={onShowWriteComment}
            styleButton={styles.reviewsButton}
            styleContainer={styles.reviewsContainerButton}
          />
        </View>
      </View>
      <FlatList
        data={data.slice(0, 10)}
        renderItem={renderItem}
        contentContainerStyle={styles.containerComments}
        scrollEnabled={false}
      />
    </View>
  );
};

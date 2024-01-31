import React, { FunctionComponent, useContext } from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";
import { Trans } from "@lingui/macro";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";

// components
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";

// icons
import { IconStar } from "../../../../../icons/components";

// styles
import { styles } from "./FooterComments.styles";
import colors from "../../../../../../styles/colors";
import { workshopsContext } from "../../../../../providers/WorkshopsProvider/WorkshopsProvider";

type FooterCommentsProps = {
  data: number[];
};

export const FooterComments: FunctionComponent<FooterCommentsProps> = ({
  data,
}) => {
  const { i18n } = useContext(localesContext);
  const { setIdComment } = useContext(workshopsContext);

  const renderItem: ListRenderItem<number> = ({ item }) => {
    const rating = Number(((item + 1) / 4).toFixed(2));
    const showAmountStars =
      Number(rating.toFixed()) > 0 ? Number(rating.toFixed()) : 1;
    const stars = Array.from({ length: showAmountStars }, (_, index) => index);

    return (
      <View style={styles.containerComment}>
        <View style={styles.headerComment}>
          <Text style={styles.titleName}>Вася Пупкін</Text>
          <Text style={styles.titleDate}>27.03.2023</Text>
        </View>
        <View style={styles.starsContainer}>
          <View style={styles.stars}>
            {stars.map((star) => (
              <IconStar
                key={`star-${star}-comment-${item}`}
                width={12}
                height={12}
                fill={colors.yellow}
              />
            ))}
          </View>
          <Text style={styles.titleStars}>{showAmountStars}</Text>
        </View>
        <Text style={styles.comment}>
          Найкраще місце для сервісу! Вони вразили своєю професіональністю та
          швидкістю виконання робіт.
        </Text>
      </View>
    );
  };

  const onShowWriteComment = () => {
    setIdComment(4);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerReviews}>
        <Text style={styles.titleReviews}>
          <Trans>Reviews:</Trans>
        </Text>
        <View style={styles.containerOtherReviews}>
          <View style={styles.containerStars}>
            <IconStar width={32} height={32} fill={colors.yellow} />
            <Text style={styles.titleStar}>5.0</Text>
          </View>
          <ButtonCustom
            title={i18n._("Write a review")}
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

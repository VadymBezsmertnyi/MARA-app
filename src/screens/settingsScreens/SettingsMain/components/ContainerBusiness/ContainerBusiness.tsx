import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import {
  ImageURISource,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Trans } from "@lingui/macro";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";
import { businessContext } from "../../../../../providers/BusinessProvider/BusinessProvider";
import { useSubscriptionProvider } from "../../../../../providers/SubscriptionProvider/SubscriptionProvider";

// components
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";
import { ImageCache } from "../../../../../components/ImageCache/ImageCache";
import { ModalDelete } from "../../../../../components/ModalDelete/ModalDelete";
import { PhoneWithMessengers } from "../../../../../components/PhoneWithMessengers/PhoneWithMessengers";

// icons
import {
  IconArrowDownGradient,
  IconArrowUpGradient,
  IconProfileAvatar,
} from "../../../../../icons/components";

// styles
import { styles } from "./ContainerBusiness.styles";

type ContainerBusinessProps = {
  onCreateBusiness: () => void;
  onChangeBusiness: (businessMarketId: string) => void;
  onReviewBusiness: (businessMarketId: string) => void;
};

export const ContainerBusiness: FunctionComponent<ContainerBusinessProps> = ({
  onCreateBusiness,
  onChangeBusiness,
  onReviewBusiness,
}) => {
  const { i18n } = useContext(localesContext);
  const { infoBusinessAdverts } = useSubscriptionProvider();
  const { businessMarketUser, onDeleteBusinessMarket } =
    useContext(businessContext);
  const [isShow, setIsShow] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const { amountBusinessAdvert, useAmountBusinessAdvert } = useMemo(
    () => infoBusinessAdverts,
    [infoBusinessAdverts]
  );
  const imageSource = useMemo(
    () =>
      businessMarketUser?.logo
        ? ({
            uri: businessMarketUser.logo.url,
            cache: "force-cache",
          } as ImageURISource)
        : null,
    [businessMarketUser?.logo]
  );

  if (!businessMarketUser)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          <Trans>Business profile</Trans>
        </Text>
        <ButtonCustom
          onSubmit={onCreateBusiness}
          styleContainer={styles.containerButton}
          styleLinear={styles.linearContainerButton}
        >
          <Text style={styles.titleButton}>
            <Trans>Create</Trans>
          </Text>
        </ButtonCustom>
      </View>
    );
  return (
    <>
      <View style={styles.containerMain}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            setIsShow((state) => !state);
          }}
        >
          <Text style={styles.title}>
            <Trans>Business profile</Trans>
          </Text>
          {isShow ? (
            <IconArrowUpGradient width={16} height={16} />
          ) : (
            <IconArrowDownGradient width={16} height={16} />
          )}
        </TouchableOpacity>
        {isShow ? (
          <View style={styles.containerBusiness}>
            <View style={styles.containerBusinessInfo}>
              <View style={styles.containerBusinessLogo}>
                {imageSource ? (
                  <ImageCache
                    style={styles.containerImage}
                    imageSrc={imageSource}
                  />
                ) : (
                  <IconProfileAvatar />
                )}
                <ButtonCustom
                  title={i18n._("Improve")}
                  onSubmit={() => {
                    onChangeBusiness(businessMarketUser._id);
                  }}
                  styleContainer={styles.buttonBusinessLogo}
                  styleTitle={styles.titleButtonBusinessLogo}
                />
              </View>
              <View style={styles.containerInfoBusiness}>
                <Text style={styles.titleBusiness}>
                  {businessMarketUser.name}
                </Text>
                <Text numberOfLines={1} style={styles.titleBusiness}>
                  {businessMarketUser.place?.place_address}
                </Text>
                <PhoneWithMessengers
                  title={businessMarketUser.mainPhoneNumber.phoneNumber}
                  isTelegram={businessMarketUser.mainPhoneNumber.isTelegram}
                  isWhatsApp={businessMarketUser.mainPhoneNumber.isWhatsApp}
                  isViber={businessMarketUser.mainPhoneNumber.isViber}
                  titleStyle={styles.titleBusiness}
                />
                <Text style={styles.subTitleBusiness}>
                  {i18n._("Available ads: {ads}", {
                    ads: amountBusinessAdvert,
                  })}
                </Text>
                <Text style={styles.subTitleBusiness}>
                  {i18n._("Published ads: {ads}", {
                    ads: useAmountBusinessAdvert,
                  })}
                </Text>
              </View>
            </View>
            <View style={styles.containerButtonsBusiness}>
              <ButtonCustom
                type="transparent"
                title={i18n._("Review")}
                onSubmit={() => {
                  onReviewBusiness(businessMarketUser._id);
                }}
                styleContainer={styles.containerButtonTransparent}
                styleTitle={styles.titleButtonTransparent}
              />
              <ButtonCustom
                type="transparent"
                title={i18n._("Change")}
                onSubmit={() => {
                  onChangeBusiness(businessMarketUser._id);
                }}
                styleContainer={styles.containerButtonTransparent}
                styleTitle={styles.titleButtonTransparent}
              />
              <ButtonCustom
                type="transparent"
                title={i18n._("Delete")}
                onSubmit={() => {
                  setIsDelete(true);
                }}
                styleContainer={styles.containerButtonTransparent}
                styleTitle={styles.titleButtonTransparent}
              />
            </View>
          </View>
        ) : null}
      </View>
      {isDelete && businessMarketUser ? (
        <Modal visible={isDelete} transparent>
          <ModalDelete
            isGoBack={false}
            onSubmit={async () => {
              await onDeleteBusinessMarket();
              setIsDelete(false);
            }}
            onClose={() => {
              setIsDelete(false);
            }}
            subTitle={i18n._(
              `Attention! All data related to the "{nameBusiness}" business will be deleted.`,
              { nameBusiness: businessMarketUser.name }
            )}
          />
        </Modal>
      ) : null}
    </>
  );
};

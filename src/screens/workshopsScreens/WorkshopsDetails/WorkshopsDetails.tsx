import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { getDistance } from "geolib";
import Toast from "react-native-toast-message";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

// types
import {
  RootMainTabsParamList,
  RootWorkshopsScreensParamList,
} from "../../../navigators/Navigators.types";

// redux
import { useUserSelector } from "../../../storeRedux/apis/user/slice";
import { useWorkshopsSelector } from "../../../storeRedux/apis/workshops/slice";
import {
  useChangeWorkshopMutation,
  useSendSmsVerificationMutation,
  useVerifySmsCodeMutation,
  useLazyGetWorkshopsUserQuery,
  useLazyGetWorkshopByIdQuery,
} from "../../../storeRedux/api";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useMapProvider } from "../../../providers/MapProvider/MapProvider";
import { usePlacesProvider } from "../../../providers/PlacesProvider/PlacesProvider";
import { useSharingProvider } from "../../../providers/SharingProvider/SharingProvider";
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";
import { useDropDownAlertProvider } from "../../../providers/DropDownAlertProvider/DropDownAlertProvider";

// helps
import { getFormatPhoneNumber } from "../../../helps/helps";

// components
import { Header } from "../../../components/Header/Header";
import { HeaderRightActions } from "../../../components/HeaderRightActions/HeaderRightActions";
import { CustomSlider } from "../../../components/CustomSlider/CustomSlider";
import { DistanceCard } from "../../../components/DistanceCard/DistanceCard";
import { Map } from "../../../components/Map/Map";
import { ListWorksDo } from "./components/ListWorksDo/ListWorksDo";
import { FooterComments } from "./components/FooterComments/FooterComments";
import { ModalComment } from "./components/ModalComment/ModalComment";
import { WorkingHoursDisplay } from "./components/WorkingHoursDisplay/WorkingHoursDisplay";
import { ModalSelectPhone } from "../../settingsScreens/SettingsWorkshops/components/ModalSelectPhone/ModalSelectPhone";
import { ModalEnterCode } from "../../settingsScreens/SettingsWorkshops/components/ModalEnterCode/ModalEnterCode";
import { ModalReportContact } from "../../../components/ModalReportContact/ModalReportContact";

// icons
import { IconAutoService, IconMotoService } from "../../../icons/components";

// styles
import { styles } from "./WorkshopsDetails.styles";
import colors from "../../../../styles/colors";
import { resetNavigationToMap } from "../../../navigators/Navigators.helps";

const EXPO_PUBLIC_WEB_SITE_URL =
  process.env.EXPO_PUBLIC_WEB_SITE_URL || "https://m-a-r-a.netlify.app";

type WorkshopsDetailsProps = {
  navigation: NativeStackNavigationProp<
    RootWorkshopsScreensParamList & RootMainTabsParamList
  >;
  route: RouteProp<
    RootWorkshopsScreensParamList,
    keyof RootWorkshopsScreensParamList
  >;
};

export const WorkshopsDetails: FunctionComponent<WorkshopsDetailsProps> = ({
  navigation,
  route,
}) => {
  const { heightTabBar } = useThemeProvider();
  const { i18n, language } = useLocalesProvider();
  const { userData } = useUserSelector();
  const { workshopsList: workshops } = useWorkshopsSelector();
  const { showMessageServer } = useDropDownAlertProvider();
  const [changeWorkshopMutation] = useChangeWorkshopMutation();
  const [sendSms] = useSendSmsVerificationMutation();
  const [verifyCode, { isLoading: verifyingCode }] = useVerifySmsCodeMutation();
  const [getWorkshopsUser] = useLazyGetWorkshopsUserQuery();
  const [getWorkshopById, { data: workshopByIdData }] =
    useLazyGetWorkshopByIdQuery();
  const { placesDB } = usePlacesProvider();
  const { location } = useMapProvider();
  const { createSharedLink } = useSharingProvider();
  const [amountShow, setAmountShow] = useState(5);
  const [isFullDescription, setIsFullDescription] = useState(false);
  const [isShowModalComment, setIsShowModalComment] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const workshopId =
    typeof route.params?.workshopId === "string"
      ? route.params.workshopId
      : undefined;
  const workshopFromList = useMemo(
    () =>
      workshopId
        ? workshops.find((workshop) => workshop._id === workshopId) || null
        : null,
    [workshopId, workshops]
  );
  const workshopFromApi = useMemo(
    () =>
      workshopByIdData?.workshop && workshopByIdData.workshop._id === workshopId
        ? workshopByIdData.workshop
        : null,
    [workshopByIdData?.workshop, workshopId]
  );
  const selectWorkshop = useMemo(
    () => workshopFromList || workshopFromApi,
    [workshopFromList, workshopFromApi]
  );
  const distance =
    location && selectWorkshop?.coordinates
      ? getDistance(location, {
          longitude: selectWorkshop.coordinates.longitude,
          latitude: selectWorkshop.coordinates.latitude,
        })
      : null;
  const isLike = useMemo(
    () =>
      userData && selectWorkshop
        ? selectWorkshop.likeUserIds.includes(userData._id)
        : false,
    [selectWorkshop?.likeUserIds]
  );

  const isCommentUser = useMemo(
    () =>
      selectWorkshop && userData
        ? selectWorkshop.comments.filter(
            (comment) => comment.userId === userData._id
          ).length > 0
        : false,
    [selectWorkshop, userData]
  );
  const commentsForDisplay = useMemo(() => {
    const currentUserId = userData?._id;
    const pendingLabel = "На перевірці";
    if (!selectWorkshop?.comments) return [];
    return selectWorkshop.comments
      .filter((comment) => {
        if (comment.status === "pending")
          return comment.userId === currentUserId;
        return comment.status === "verify" || comment.status === undefined;
      })
      .map((comment) =>
        comment.status === "pending" && comment.userId === currentUserId
          ? { ...comment, userName: `${comment.userName} (${pendingLabel})` }
          : comment
      );
  }, [selectWorkshop?.comments, userData?._id]);
  const commentsReverse = useMemo(
    () => [...commentsForDisplay].reverse(),
    [commentsForDisplay]
  );
  const displayContacts = useMemo(() => {
    if (!selectWorkshop) return [];
    if (selectWorkshop.contacts && selectWorkshop.contacts.length > 0)
      return selectWorkshop.contacts;
    if (selectWorkshop.phoneNumber)
      return [{ type: "phone" as const, value: selectWorkshop.phoneNumber }];

    return [];
  }, [selectWorkshop]);

  const getContactIcon = (type: string) => {
    switch (type) {
      case "phone":
        return <MaterialIcons name="phone" size={20} color={colors.white} />;
      case "email":
        return <MaterialIcons name="email" size={20} color={colors.white} />;
      case "viber":
        return <FontAwesome5 name="viber" size={20} color={colors.white} />;
      case "telegram":
        return <FontAwesome5 name="telegram" size={20} color={colors.white} />;
      case "whatsapp":
        return <FontAwesome5 name="whatsapp" size={20} color={colors.white} />;
      case "instagram":
        return <FontAwesome5 name="instagram" size={20} color={colors.white} />;
      case "facebook":
        return <FontAwesome5 name="facebook" size={20} color={colors.white} />;
      default:
        return (
          <MaterialIcons name="contact-phone" size={20} color={colors.white} />
        );
    }
  };

  const handleContactPress = (contact: { type: string; value: string }) => {
    if (contact.type === "phone") Linking.openURL(`tel:${contact.value}`);
    else if (contact.type === "email")
      Linking.openURL(`mailto:${contact.value}`);
    else if (contact.type === "viber")
      Linking.openURL(`viber://chat?number=${contact.value}`);
    else if (contact.type === "telegram")
      Linking.openURL(`tg://resolve?domain=${contact.value.replace("@", "")}`);
    else if (contact.type === "whatsapp")
      Linking.openURL(`whatsapp://send?phone=${contact.value}`);
    else if (contact.type === "instagram")
      Linking.openURL(
        `https://instagram.com/${contact.value.replace("@", "")}`
      );
    else if (contact.type === "facebook")
      Linking.openURL(`https://facebook.com/${contact.value}`);
  };
  const showTitlePlace = useMemo(() => {
    if (!selectWorkshop) return "";

    const placeDB = selectWorkshop.place_id;
    if (!placeDB) return "";

    return placeDB[language].formatted_address;
  }, [placesDB, selectWorkshop?.place_id]);

  const onClose = () => {
    setIsShowModalComment(false);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    if (
      amountShow < commentsReverse.length &&
      layoutMeasurement.height + contentOffset.y >= contentSize.height
    )
      setAmountShow((state) =>
        state + 5 <= commentsReverse.length ? state + 5 : commentsReverse.length
      );
  };

  const onPressLike = async () => {
    if (!selectWorkshop || !userData) {
      Toast.show({
        type: "error",
        text1: i18n._("Error"),
        text2: i18n._("Unable to like the workshop"),
      });
      return;
    }
    const currentImages = selectWorkshop.imageFiles.map((image) => ({
      _id: image._id || "",
      url: image.url || "",
      width: image.width,
      height: image.height,
      image,
    }));
    const likeUserIds = isLike
      ? selectWorkshop.likeUserIds.filter(
          (likeUserId) => likeUserId !== userData?._id
        )
      : [...selectWorkshop.likeUserIds, userData._id];
    await changeWorkshopMutation({
      body: {
        _id: selectWorkshop._id,
        imageFiles: currentImages,
        likeUserIds,
        userId: selectWorkshop.userId?._id || userData._id,
      },
    });
  };

  const onPressShare = async () => {
    if (!selectWorkshop) return;
    const appLink = await createSharedLink({ workshopId: selectWorkshop._id });
    if (!appLink) {
      await showMessageServer(
        i18n._("Error"),
        i18n._("Failed to create share link"),
        "error"
      );
      return;
    }
    const shortLink = selectWorkshop._id; // TODO: implement real short link if needed
    const webLink = `${EXPO_PUBLIC_WEB_SITE_URL}/share/${shortLink}`;
    const message = i18n._(
      "Open the workshop in the app:\n{appLink}\n\nOpen in the browser:\n{webLink}",
      { appLink, webLink }
    );
    await Share.share({
      title: i18n._("Share workshop"),
      message,
    });
  };

  const hasOwner = !!selectWorkshop?.ownerUserId;
  const isCurrentUserOwner =
    userData &&
    selectWorkshop?.ownerUserId &&
    (typeof selectWorkshop.ownerUserId === "string"
      ? selectWorkshop.ownerUserId === userData._id
      : selectWorkshop.ownerUserId._id === userData._id);
  const isCurrentUserCreator =
    userData &&
    selectWorkshop?.userId &&
    (typeof selectWorkshop.userId === "string"
      ? selectWorkshop.userId === userData._id
      : selectWorkshop.userId._id === userData._id);
  const showConfirmButton = !hasOwner && userData;
  const showReportButton =
    !isCurrentUserOwner && !isCurrentUserCreator && userData;

  const handlePhoneSelect = async (phoneNumber: string) => {
    if (!selectWorkshop) return;
    setShowPhoneModal(false);
    setCodeError(null);

    const result = await sendSms({
      body: {
        workshopId: selectWorkshop._id,
        phoneNumber,
      },
    });

    if (result.data?.status === "success") setShowCodeModal(true);
    else
      await showMessageServer(
        i18n._("Error"),
        result.data?.reason || i18n._("Failed to send SMS"),
        "error"
      );
  };

  const handleCodeConfirm = async (code: string) => {
    if (!selectWorkshop) return;
    setCodeError(null);

    const result = await verifyCode({
      body: {
        workshopId: selectWorkshop._id,
        code,
      },
    });

    if (result.data?.status === "success") {
      setShowCodeModal(false);
      await getWorkshopById({ workshopId: selectWorkshop._id });
      if (userData?._id) await getWorkshopsUser({ userId: userData._id });

      await showMessageServer(
        i18n._("Success"),
        i18n._("Everything is successful and this is your business"),
        "success"
      );
    } else
      setCodeError(result.data?.reason || i18n._("Invalid or expired code"));
  };

  useEffect(() => {
    if (!workshopId) return;
    if (workshopFromList) return;
    if (workshopFromApi) return;
    getWorkshopById({ workshopId });
  }, [workshopId, workshopFromList, workshopFromApi, getWorkshopById]);

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: heightTabBar,
        },
      ]}
    >
      <Header
        title={i18n._("Workshop")}
        rightElement={
          <HeaderRightActions
            onPressLike={onPressLike}
            isLike={isLike}
            onPressShare={onPressShare}
          />
        }
        onPressLeftElement={() => {
          if (!route.params?.isMap) navigation.goBack();
          else resetNavigationToMap(navigation);
        }}
        containerStyle={{ paddingRight: 0 }}
      />
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.containerMain}>
          {selectWorkshop?.imageFiles.length ? (
            <View style={styles.containerSlider}>
              <CustomSlider
                images={selectWorkshop.imageFiles}
                loop
                styleScroll={(props) => [props, styles.imagesScroll]}
              />
            </View>
          ) : null}
          <View style={styles.containerInfo}>
            <View style={styles.info}>
              <View style={styles.titles}>
                <Text style={styles.titleInfo}>{selectWorkshop?.title}</Text>
                <Text style={styles.subTitleInfo}>{showTitlePlace}</Text>
              </View>
              <DistanceCard
                distance={distance}
                numberOfLines={1}
                containerStyle={styles.containerDistance}
              />
            </View>
            {!distance && location && (
              <Text style={styles.geoDisabledText}>
                {i18n._("Unable to calculate distance, location is disabled")}
              </Text>
            )}
            {selectWorkshop && (
              <WorkingHoursDisplay workingHours={selectWorkshop.workingHours} />
            )}
            <View style={styles.containerContacts}>
              <View style={styles.containerContactsList}>
                {displayContacts.length > 0 ? (
                  displayContacts.map((contact, index) => (
                    <TouchableOpacity
                      key={`contact-${index}`}
                      style={styles.containerContact}
                      onPress={() => handleContactPress(contact)}
                    >
                      <View style={styles.containerIcon}>
                        {getContactIcon(contact.type)}
                      </View>
                      <Text style={styles.titlePhone} numberOfLines={1}>
                        {contact.type === "phone"
                          ? getFormatPhoneNumber(contact.value)
                          : contact.value}
                      </Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={styles.containerContact}>
                    <View style={styles.containerIcon}>
                      <MaterialIcons
                        name="contact-phone"
                        size={20}
                        color={colors.grayCloudy}
                      />
                    </View>
                    <Text style={styles.titlePhoneUnknown} numberOfLines={1}>
                      {i18n._("Contacts unknown")}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.containerIconsService}>
                {selectWorkshop?.autoTypesWorks.length ? (
                  <IconAutoService
                    width={32}
                    height={32}
                    style={
                      selectWorkshop?.motoTypesWorks.length
                        ? styles.autoIcon
                        : undefined
                    }
                  />
                ) : null}
                {selectWorkshop?.motoTypesWorks.length ? (
                  <IconMotoService width={32} height={32} />
                ) : null}
              </View>
            </View>
          </View>
          {selectWorkshop?.coordinates ? (
            <View style={styles.containerMap}>
              <Map
                longitude={selectWorkshop.coordinates.longitude}
                latitude={selectWorkshop.coordinates.latitude}
              />
            </View>
          ) : null}
          <View style={styles.containerDescription}>
            <Text style={styles.titleDescription}>{i18n._("About us:")}</Text>
            <Text style={styles.description}>
              {isFullDescription
                ? selectWorkshop?.description
                : `${selectWorkshop?.description.slice(0, 100)}... `}
              {!isFullDescription && (
                <TouchableOpacity
                  style={styles.buttonDescription}
                  onPress={() => {
                    setIsFullDescription(true);
                  }}
                >
                  <Text style={styles.titleButtonDescription}>
                    {i18n._("Read the whole description...")}
                  </Text>
                </TouchableOpacity>
              )}
            </Text>
          </View>
          {selectWorkshop ? (
            <ListWorksDo
              motoWorkIds={selectWorkshop.motoTypesWorks}
              autoWorkIds={selectWorkshop.autoTypesWorks}
            />
          ) : null}
          {showConfirmButton && selectWorkshop && (
            <View style={styles.containerConfirmOwnership}>
              <Text style={styles.confirmOwnershipText}>
                {i18n._("This business has not been confirmed by the owner")}
              </Text>
              <TouchableOpacity
                style={styles.buttonConfirmOwnership}
                onPress={() => setShowPhoneModal(true)}
              >
                <Text style={styles.buttonConfirmOwnershipText}>
                  {i18n._("Confirm business")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {showReportButton && (
            <View style={styles.containerReport}>
              <TouchableOpacity
                style={styles.buttonReport}
                onPress={() => setShowReportModal(true)}
              >
                <Text style={styles.buttonReportText}>
                  {i18n._("Report on business")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <FooterComments
            data={commentsReverse.slice(0, amountShow)}
            isCommentUser={isCommentUser}
            setIsShowModalComment={setIsShowModalComment}
            rating={selectWorkshop?.rating || 0}
          />
        </View>
        <View style={styles.containerEmpty} />
      </ScrollView>
      {isShowModalComment && (
        <ModalComment selectWorkshop={selectWorkshop} onClose={onClose} />
      )}
      {selectWorkshop && (
        <>
          <ModalSelectPhone
            visible={showPhoneModal}
            onClose={() => setShowPhoneModal(false)}
            workshop={selectWorkshop}
            onConfirm={handlePhoneSelect}
          />
          <ModalEnterCode
            visible={showCodeModal}
            onClose={() => {
              setShowCodeModal(false);
              setCodeError(null);
            }}
            onConfirm={handleCodeConfirm}
            isLoading={verifyingCode}
            error={codeError}
          />
        </>
      )}
      <ModalReportContact
        visible={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
    </View>
  );
};

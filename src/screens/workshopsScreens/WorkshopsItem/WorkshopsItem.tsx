import React, {
  FunctionComponent,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { Trans } from "@lingui/macro";

// types
import { RootWorkshopsScreensParamList } from "../../../navigators/Navigators.types";

// providers
import { localesContext } from "../../../../localization/localization.provider";
import { userContext } from "../../../providers/UserProvider/UserProvider";

// helps
import { getFormatPhoneNumber } from "../../../helps/helps";

// images
import WorkshopPhoto from "../../../../assets/default/workshop-slider.png";

// components
import { Header } from "../../../components/Header/Header";
import { HeaderRightItem } from "./components/HeaderRightItem/HeaderRightItem";
import { CustomSlider } from "../../../components/CustomSlider/CustomSlider";
import { DistanceCard } from "../../../components/DistanceCard/DistanceCard";
import { Map } from "../../../components/Map/Map";
import { ListWorksDo } from "./components/ListWorksDo/ListWorksDo";
import { FooterComments } from "./components/FooterComments/FooterComments";

// icons
import {
  IconAutoService,
  IconMotoService,
  RadixIconsCalendar,
} from "../../../icons/components";

// styles
import { styles } from "./WorkshopsItem.styles";

type WorkshopsItemType = {
  navigation: NativeStackNavigationProp<RootWorkshopsScreensParamList>;
  route: RouteProp<
    RootWorkshopsScreensParamList,
    keyof RootWorkshopsScreensParamList
  >;
};

const DELETE_LIST_IMAGES = [WorkshopPhoto, WorkshopPhoto, WorkshopPhoto];

export const WorkshopsItem: FunctionComponent<WorkshopsItemType> = ({
  navigation,
  route,
}) => {
  const { i18n } = useContext(localesContext);
  const { userData } = useContext(userContext);
  const data = [...Array.from({ length: 20 }, (_, index) => index)].reverse();
  const [amountShow, setAmountShow] = useState(5);
  const [isFullDescription, setIsFullDescription] = useState(false);
  const phone = userData?.phoneNumber || ""; // TODO CHANGE
  const showPhone = useMemo(() => getFormatPhoneNumber(phone), [phone]);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    if (
      amountShow < data.length &&
      layoutMeasurement.height + contentOffset.y >= contentSize.height
    )
      setAmountShow((state) =>
        state + 5 <= data.length ? state + 5 : data.length
      );
  };

  return (
    <View style={styles.container}>
      <Header title={i18n._("Workshop")} rightElement={<HeaderRightItem />} />
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.containerMain}>
          <View style={styles.containerInfo}>
            <View style={styles.containerSlider}>
              <CustomSlider
                images={DELETE_LIST_IMAGES}
                loop
                styleScroll={(props) => [props, { borderRadius: 3 }]}
              />
            </View>
            <View style={styles.info}>
              <View style={styles.titles}>
                <Text style={styles.titleInfo}>У Вадима</Text>
                <Text style={styles.subTitleInfo}>
                  вул. Володимира Великого, 36
                </Text>
              </View>
              <DistanceCard distance={null} numberOfLines={1} />
            </View>
            <View style={styles.containerContacts}>
              <View style={styles.containerPhone}>
                <View style={styles.containerIcon}>
                  <RadixIconsCalendar width={24} height={24} />
                </View>
                <Text style={styles.titlePhone}>{showPhone}</Text>
              </View>
              <View style={styles.containerIconsService}>
                <IconAutoService
                  width={40}
                  height={40}
                  style={styles.autoIcon}
                />
                <IconMotoService width={40} height={40} />
              </View>
            </View>
          </View>
          <View style={styles.containerMap}>
            <Map longitude={0} latitude={0} />
          </View>
          <View style={styles.containerDescription}>
            <Text style={styles.titleDescription}>
              <Trans>About us:</Trans>
            </Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet consectetur. Orci sit rutrum vestibulum
              turpis tempus nulla arcu vel. Lorem ipsum dolor sit amet
              consectetur.
              {!isFullDescription && (
                <TouchableOpacity
                  style={styles.buttonDescription}
                  onPress={() => {
                    setIsFullDescription(true);
                  }}
                >
                  <Text style={styles.titleButtonDescription}>
                    <Trans>Read the whole description...</Trans>
                  </Text>
                </TouchableOpacity>
              )}
            </Text>
          </View>
          <ListWorksDo />
          <FooterComments data={data.slice(0, amountShow)} />
        </View>
        <View style={styles.containerEmpty} />
      </ScrollView>
    </View>
  );
};

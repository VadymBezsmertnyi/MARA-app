import React, { FunctionComponent, useContext, useMemo } from "react";
import { View } from "react-native";

// types
import { TypeDataCategory, TypeModalCategories } from "../../MarketAdd.types";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";

// components
import { Input } from "../../../../../components/Input/Input";
import { SelectTwoButtons } from "../../../../../components/SelectTwoButtons/SelectTwoButtons";
import { InputButton } from "../../../../../components/InputButton/InputButton";

// constants
import {
  NAME_AUTO_PARTS,
  NAME_BRAND_AUTO,
  NAME_BRAND_MOTO,
  NAME_MOTO_PARTS,
  NAME_TYPE_FUEL,
  NAME_TYPE_TRANSMISSION,
} from "../../MarketAdd.constants";

// icons
import { IconArrowRightEvent } from "../../../../../icons/components";

// styles
import { styles } from "./BodyCategory.styles";
import colors from "../../../../../../styles/colors";

type BodyCategoryProps = {
  select: Record<TypeModalCategories, TypeDataCategory | undefined> | null;
  setTypeModal: React.Dispatch<
    React.SetStateAction<TypeModalCategories | null>
  >;
  mileage: string;
  setMileage: React.Dispatch<React.SetStateAction<string>>;
  yearRelease: string;
  setYearRelease: React.Dispatch<React.SetStateAction<string>>;
  isCleared: boolean;
  setIsCleared: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: Record<
    string,
    {
      name: string;
      title: string;
    }
  > | null;
  clearKeyError: (type: string) => void;
};

export const BodyCategory: FunctionComponent<BodyCategoryProps> = ({
  select,
  setTypeModal,
  mileage,
  setMileage,
  yearRelease,
  setYearRelease,
  isCleared,
  setIsCleared,
  errorMessage,
  clearKeyError,
}) => {
  const { i18n } = useContext(localesContext);
  const isMoto = useMemo(() => select?.category?.id === 1, [select?.category]);
  const isCar = useMemo(() => select?.category?.id === 2, [select?.category]);
  const isMotoParts = useMemo(
    () => select?.category?.id === 3,
    [select?.category]
  );
  const isCarParts = useMemo(
    () => select?.category?.id === 4,
    [select?.category]
  );

  if (select === null) return null;
  return (
    <View style={styles.container}>
      <InputButton
        placeholder={i18n._("Brand/Make")}
        value={
          select.brandAuto?.name ||
          select.brandMoto?.name ||
          i18n._("Brand/Make")
        }
        onPress={() => {
          if (isMoto || isMotoParts) setTypeModal(NAME_BRAND_MOTO);
          if (isCar || isCarParts) setTypeModal(NAME_BRAND_AUTO);
          clearKeyError("brand");
        }}
        rightElementInput={
          <IconArrowRightEvent
            width={15}
            height={15}
            fill={colors.blackCoffee}
          />
        }
        containerStyle={styles.containerStyleInputButton}
        inputWrapperStyle={styles.inputWrapperStyleInputButton}
        errorMessage={errorMessage?.brand ? errorMessage.brand.title : ""}
      />
      {isMoto || isCar ? (
        <>
          <View style={styles.containerTwoInputs}>
            <Input
              keyboardType="numeric"
              label={i18n._("Mileage, km:")}
              placeholder={"100"}
              value={mileage}
              onChange={(value) => {
                setMileage(value);
                clearKeyError("mileage");
              }}
              containerStyle={styles.containerInput}
              errorMessage={
                errorMessage?.mileage ? errorMessage.mileage.title : ""
              }
            />
            <Input
              keyboardType="numeric"
              label={i18n._("Year of release:")}
              placeholder={"1999"}
              value={yearRelease}
              onChange={(value) => {
                setYearRelease(value);
                clearKeyError("yearRelease");
              }}
              containerStyle={styles.containerInput}
              errorMessage={
                errorMessage?.yearRelease ? errorMessage.yearRelease.title : ""
              }
            />
          </View>
          <SelectTwoButtons
            isSelectFirst={isCleared}
            titleFirst={i18n._("Yes")}
            titleSecond={i18n._("No")}
            label={i18n._("Cleared:")}
            onPressFirst={() => {
              setIsCleared(true);
            }}
            onPressSecond={() => {
              setIsCleared(false);
            }}
            containerStyle={styles.containerCurrent}
          />
          <InputButton
            placeholder={i18n._("Type fuel")}
            value={select.typeFuel?.name || i18n._("Type fuel")}
            onPress={() => {
              setTypeModal(NAME_TYPE_FUEL);
            }}
            rightElementInput={
              <IconArrowRightEvent
                width={15}
                height={15}
                fill={colors.blackCoffee}
              />
            }
            containerStyle={styles.containerStyleInputButton}
            inputWrapperStyle={styles.inputWrapperStyleInputButton}
            errorMessage={
              errorMessage?.typeFuel ? errorMessage.typeFuel.title : ""
            }
          />
          <InputButton
            placeholder={i18n._("Transmission gearbox")}
            value={
              select.typeTransmission?.name || i18n._("Transmission gearbox")
            }
            onPress={() => {
              setTypeModal(NAME_TYPE_TRANSMISSION);
            }}
            rightElementInput={
              <IconArrowRightEvent
                width={15}
                height={15}
                fill={colors.blackCoffee}
              />
            }
            containerStyle={styles.containerStyleInputButton}
            inputWrapperStyle={styles.inputWrapperStyleInputButton}
            errorMessage={
              errorMessage?.typeTransmission
                ? errorMessage.typeTransmission.title
                : ""
            }
          />
        </>
      ) : null}
      {isMotoParts || isCarParts ? (
        <InputButton
          placeholder={
            isMotoParts ? i18n._("Motorcycle parts") : i18n._("Car parts")
          }
          value={
            select.motoParts?.name ||
            select.autoParts?.name ||
            (isMotoParts ? i18n._("Motorcycle parts") : i18n._("Car parts"))
          }
          onPress={() => {
            setTypeModal(isMotoParts ? NAME_MOTO_PARTS : NAME_AUTO_PARTS);
          }}
          rightElementInput={
            <IconArrowRightEvent
              width={15}
              height={15}
              fill={colors.blackCoffee}
            />
          }
          containerStyle={styles.containerPartsInputButton}
          inputWrapperStyle={styles.inputWrapperStyleInputButton}
          errorMessage={
            errorMessage?.typeParts ? errorMessage.typeParts.title : ""
          }
        />
      ) : null}
    </View>
  );
};

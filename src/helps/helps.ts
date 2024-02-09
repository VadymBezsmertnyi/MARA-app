import { Dimensions } from "react-native";
import { ImagePickerSuccessResult } from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import infoPhoneCountries from "country-telephone-data";

// schemas
import { imagesSchema } from "../components/ImageModal/ImageModal.schemas";

// types
import { ImageType } from "../components/ImageModal/ImageModal.types";

export const formatDateFromUnixTimestamp = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Додаємо 1, оскільки місяці в JavaScript починаються з 0
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const dateToNMY = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDay = day < 10 ? `0${day}` : day.toString();
  const formattedMonth = month < 10 ? `0${month}` : month.toString();
  const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;
  return formattedDate;
};

export const getTimeFromMilliseconds = (
  milliseconds: number,
  type: "HH:MM:SS" | "HH:MM" = "HH:MM"
) => {
  const date = new Date(milliseconds);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  if (type === "HH:MM") return `${formattedHours}:${formattedMinutes}`;
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export const combineDateAndTime = (date: Date, time: Date): Date => {
  const hours = time.getHours();
  const minutes = time.getMinutes();

  const combinedDate = new Date(date);
  combinedDate.setHours(hours);
  combinedDate.setMinutes(minutes);

  return combinedDate;
};

export const compressAndProcessImages = async (
  result: ImagePickerSuccessResult
): Promise<ImageType[]> => {
  const listImagesCompress = await Promise.all(
    result.assets.map(async (image) =>
      ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { width: image.width / 2 } }],
        {
          compress: 0.7,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true,
        }
      )
    )
  );

  const listImages = listImagesCompress
    .map(({ width, height, base64 }) => ({
      width,
      height,
      base64,
    }))
    .filter((image) => image.base64 && image.base64.length > 0);
  const isCurrentListImages = imagesSchema.safeParse(listImages);
  if (isCurrentListImages.success) return isCurrentListImages.data;
  return [];
};

export const getStreetNumber = (fullTerms: Array<{ value: string }>) => {
  const address = fullTerms
    .filter(
      (term, index) => index === 0 || (index === 1 && Number(term.value) >= 0)
    )
    .map((trim) => trim.value);
  const isNumberHouse = address.length > 1;
  const cityCountry = fullTerms
    .filter(
      (term, index) =>
        (isNumberHouse ? index > 1 : index >= 1) && term.value.length > 0
    )
    .map((trim) => trim.value);
  return { address: address.join(", "), cityCountry: cityCountry.join(", ") };
};

export const getRightSizeImage = (
  image: ImageType,
  width?: number | null,
  maxHeight?: number
) => {
  const widthWindow = width ? width : Dimensions.get("window").width;
  const coefficientSize =
    Number(((widthWindow * 100) / image.width).toFixed()) / 100;
  const currentCoefficientSize =
    maxHeight && maxHeight < coefficientSize ? maxHeight : coefficientSize;
  return { width: widthWindow, height: image.height * currentCoefficientSize };
};

export const getFormatPhoneNumber = (phone: string) => {
  const country =
    infoPhoneCountries.allCountries.find((country) =>
      phone.slice(0, 4).includes(country.dialCode)
    ) || null;
  if (!country) return "";

  let indexPhone = 0;
  const arrayNumber = country.format.split("").map((item) => {
    if (item === "+") {
      indexPhone = indexPhone + 1;
      return item;
    }
    if (item === ".") {
      const currentNumber = phone[indexPhone] ? phone[indexPhone] : item;
      indexPhone = indexPhone + 1;
      return currentNumber;
    }
    return item;
  });

  return arrayNumber.join("");
};

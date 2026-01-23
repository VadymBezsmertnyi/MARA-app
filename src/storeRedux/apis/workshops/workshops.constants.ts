import { TWorkshop } from "./workshops.types";

export const DEFAULT_WORKSHOP_DATA: Omit<TWorkshop, "_id"> = {
  userId: null,
  title: "",
  description: "",
  phoneNumber: "",
  place_id: null,
  region_place_id: null,
  country_place_id: null,
  place_address: "",
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  motoTypesWorks: [],
  autoTypesWorks: [],
  imageFiles: [],
  dataCreate: 0,
  comments: [],
  rating: null,
  likeUserIds: [],
};

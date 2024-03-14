import { WorkshopType } from "./WorkshopsProvider.types";

export const DEFAULT_WORKSHOP_DATA: Omit<WorkshopType, "id"> = {
  userId: 0,
  title: "",
  description: "",
  phoneNumber: "",
  place_id: "",
  region_place_id: "",
  country_place_id: "",
  place_address: "",
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  motoTypesWorks: [],
  autoTypesWorks: [],
  images: [],
  dataCreate: 0,
  comments: [],
  rating: null,
  likeUserIds: [],
};

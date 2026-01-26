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
  workingHours: {
    monday: { open: "08:00", close: "18:00" },
    tuesday: { open: "08:00", close: "18:00" },
    wednesday: { open: "08:00", close: "18:00" },
    thursday: { open: "08:00", close: "18:00" },
    friday: { open: "08:00", close: "18:00" },
    saturday: null,
    sunday: null,
  },
};

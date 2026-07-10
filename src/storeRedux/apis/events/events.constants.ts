import { TEvent } from "./events.types";

export const DEFAULT_EVENT_DATA: Omit<TEvent, "_id" | "userId"> = {
  title: "",
  place_id: null,
  region_place_id: null,
  country_place_id: null,
  place_address: "",
  coordinates: { latitude: 0, longitude: 0 },
  date: { start: 0, finish: 0 },
  price: null,
  timeline: [],
  currency: "UAH",
  description: "",
  imageFiles: [],
  comments: [],
  rating: null,
  likeUserIds: [],
  goingUserIds: [],
  contacts: [],
  verification: null,
};

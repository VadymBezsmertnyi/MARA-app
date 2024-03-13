import { EventType } from "./EventsProvider.types";

export const DEFAULT_EVENT_DATA: Omit<EventType, "id" | "userId"> = {
  title: "",
  place_id: "",
  region_place_id: "",
  country_place_id: "",
  place_address: "",
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  date: {
    start: 0,
    finish: 0,
  },
  price: null,
  currency: "UAH",
  description: "",
  images: [],
  likeUserIds: [],
};

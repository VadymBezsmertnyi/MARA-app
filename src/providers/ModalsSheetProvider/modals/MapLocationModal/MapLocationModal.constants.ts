import { GoogleLocationDetailResult } from "react-native-google-autocomplete/dist/services/Google.service";

export const DEFAULT_MAP_PLACE: GoogleLocationDetailResult = {
  geometry: {
    location: {
      lat: 0,
      lng: 0,
    },
    viewport: {
      northeast: {
        lat: 0,
        lng: 0,
      },
      southwest: {
        lat: 0,
        lng: 0,
      },
    },
  },
  icon: "",
  name: "",
  place_id: "",
  reference: "",
  scope: "",
  types: [],
  vicinity: "",
  adr_address: "",
  formatted_address: "",
  id: "",
  url: "",
  utc_offset: 0,
  address_components: [],
};

import { ProductType } from "./MarketProvider.types";

export const DEFAULT_PRODUCT_DATA: Omit<ProductType, "id"> = {
  userId: 0,
  title: "",
  isNew: false,
  isBusiness: false,
  images: [],
  description: "",
  place_id: "",
  region_place_id: "",
  country_place_id: "",
  price: 0,
  prices: {
    date: null,
  },
  codeCurrency: "UAH",
  phoneNumber: "",
  telegram: "",
  moto: null,
  auto: null,
  motoParts: null,
  autoParts: null,
  updateAT: 0,
  quantityViews: 0,
  likeUserIds: [],
};

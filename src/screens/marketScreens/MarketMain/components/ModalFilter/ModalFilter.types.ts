import { FilterCheckboxes } from "../../../../../components/ModalSheetPlaceCheckboxes/ModalSheetPlaceCheckboxes.types";
import { CodeCurrenciesType } from "../../../../../providers/PaymentProvider/PaymentProvider.types";
import { TypeDataCategory } from "../../../MarketAdd/MarketAdd.types";

export type ModalFilterSubmitType = {
  price: {
    codeCurrent: CodeCurrenciesType;
    min: number;
    max: number;
  } | null;
  isNew: boolean | null;
  isBusiness: boolean | null;
  category?: TypeDataCategory[];
  brandAuto?: TypeDataCategory[];
  brandMoto?: TypeDataCategory[];
  selectPlaces: FilterCheckboxes | null;
};

export type ModalSheetType = {
  isIndicator: boolean;
  snapPoints?: Array<string | number>;
  children?: JSX.Element;
  footer?: JSX.Element;
};

export type ModalSheetTypes = "input-location" | "map-location" | "input-city";

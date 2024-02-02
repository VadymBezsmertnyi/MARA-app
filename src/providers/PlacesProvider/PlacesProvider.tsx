import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// types
import { PlacesType, RegionsCountryType } from "./PlacesProvider.types";

// constants
import REGIONS_UK from "../../../assets/db/places/uk.json";
import REGIONS_PL from "../../../assets/db/places/pl.json";
import REGIONS_BY from "../../../assets/db/places/by.json";
import REGIONS_LT from "../../../assets/db/places/lt.json";
import { localesContext } from "../../../localization/localization.provider";

type PlacesContext = {
  places: PlacesType | null;
};

type PlacesProviderProps = {
  children: React.ReactNode;
};

export const placesContext = React.createContext({} as PlacesContext);

export const PlacesProvider: FunctionComponent<PlacesProviderProps> = ({
  children,
}) => {
  const { i18n } = useContext(localesContext);
  const [places, setPlaces] = useState<PlacesType | null>(null);

  const getCurrentRegion = (array: any) =>
    (array as unknown as { regions: RegionsCountryType }).regions.map(
      (item) => ({
        ...item,
        isShow: true,
        cities: item.cities
          ? item.cities.map((city) => ({ ...city, isShow: true }))
          : null,
      })
    );

  const getPlaces = () => {
    const regionsUK = getCurrentRegion(REGIONS_UK);
    const regionsPL = getCurrentRegion(REGIONS_PL);
    const regionsBY = getCurrentRegion(REGIONS_BY);
    const regionsLT = getCurrentRegion(REGIONS_LT);
    const currentPlaces: PlacesType = {
      uk: {
        id: 1,
        title: i18n._("Ukraine"),
        isShow: true,
        regions: regionsUK,
      },
      pl: {
        id: 2,
        title: i18n._("Poland"),
        isShow: true,
        regions: regionsPL,
      },
      lt: {
        id: 3,
        title: i18n._("Belarus"),
        isShow: false,
        regions: regionsBY,
      },
      bl: {
        id: 1,
        title: i18n._("Lithuania"),
        isShow: true,
        regions: regionsLT,
      },
    };
    setPlaces(currentPlaces);
  };

  const valueContext: PlacesContext = useMemo(() => ({ places }), [places]);

  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <placesContext.Provider value={valueContext}>
      {children}
    </placesContext.Provider>
  );
};

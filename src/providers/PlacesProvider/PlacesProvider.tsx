import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import qs from "qs";

// types
import {
  CountriesType,
  CountryDbType,
  GetSearchPlaceType,
  RegionsCountryType,
} from "./PlacesProvider.types";

// schemas
import {
  getCountiesResultSchema,
  getSearchPlaceSchema,
} from "./PlacesProvider.schemas";

// providers
import { apiContext } from "../ApiProvider/ApiProvider";
import { localesContext } from "../../../localization/localization.provider";

// constants
import REGIONS_UK from "../../../assets/db/places/uk.json";
import REGIONS_PL from "../../../assets/db/places/pl.json";
import REGIONS_BY from "../../../assets/db/places/by.json";
import REGIONS_LT from "../../../assets/db/places/lt.json";
import { PATHS } from "../paths.constants";

type PlacesContext = {
  places: CountriesType | null;
  getSearchPlace: (
    searchText: string,
    isDeep?: boolean
  ) => Promise<GetSearchPlaceType | null>;
};

type PlacesProviderProps = {
  children: React.ReactNode;
};

export const placesContext = React.createContext({} as PlacesContext);

export const PlacesProvider: FunctionComponent<PlacesProviderProps> = ({
  children,
}) => {
  const { api } = useContext(apiContext);
  const { i18n, language } = useContext(localesContext);
  const [places, setPlaces] = useState<CountriesType | null>(null);
  // TODO NEW LOGICs
  const [countries, setCountries] = useState<CountryDbType[]>([]);
  const countriesSelectLanguage = useMemo(
    () =>
      countries.map(({ id, place_id, [language]: country }) => ({
        id,
        place_id,
        ...country,
      })),
    [countries, language]
  );
  console.log("countries", countries);
  console.log("countriesSelectLanguage", countriesSelectLanguage);

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
    const currentPlaces: CountriesType = {
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
      bl: {
        id: 3,
        title: i18n._("Belarus"),
        isShow: false,
        regions: regionsBY,
      },
      lt: {
        id: 4,
        title: i18n._("Lithuania"),
        isShow: true,
        regions: regionsLT,
      },
    };
    setPlaces(currentPlaces);
  };

  const getCounties = async () => {
    const result = await api(
      PATHS.placesCountries,
      { method: "GET" },
      getCountiesResultSchema
    );
    if (result) setCountries(result.countries);
  };

  const getSearchPlace = async (
    searchText: string,
    isDeep = false
  ): Promise<GetSearchPlaceType | null> => {
    const queryParams = qs.stringify(
      {
        searchText,
        language,
        isDeep,
      },
      { addQueryPrefix: true }
    );
    const result = await api(
      `${PATHS.placesCitiesSearch}${queryParams}`,
      { method: "GET" },
      getSearchPlaceSchema
    );
    return result;
  };

  const valueContext: PlacesContext = useMemo(
    () => ({ places, getSearchPlace }),
    [places]
  );

  useEffect(() => {
    getPlaces();
  }, [language]);

  useEffect(() => {
    getCounties();
  }, []);

  return (
    <placesContext.Provider value={valueContext}>
      {children}
    </placesContext.Provider>
  );
};

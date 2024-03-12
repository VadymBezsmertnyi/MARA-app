import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import qs from "qs";
import { z } from "zod";

// types
import {
  CountriesType,
  CountryDbType,
  GetSearchCountryType,
  GetSearchPlaceType,
  PlaceDbType,
  RegionsCountryType,
} from "./PlacesProvider.types";

// schemas
import {
  getCountiesResultSchema,
  getSearchCountrySchema,
  getSearchPlaceSchema,
  placeDbSchema,
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
  placesDB: PlaceDbType[];
  getSearchCountry: (
    searchText: string,
    isDeep?: boolean
  ) => Promise<GetSearchCountryType | null>;
  getSearchRegion: (
    searchText: string,
    isDeep?: boolean
  ) => Promise<GetSearchCountryType | null>;
  getSearchPlace: (
    searchText: string,
    isDeep?: boolean
  ) => Promise<GetSearchPlaceType | null>;
  getPlace: (placeId: string) => PlaceDbType | null;
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
  const [countriesDB, setCountriesDB] = useState<CountryDbType[]>([]);
  const [placesDB, setPlacesDB] = useState<PlaceDbType[]>([]);
  const countriesSelectLanguage = useMemo(
    () =>
      countriesDB.map(({ id, place_id, [language]: country }) => ({
        id,
        place_id,
        ...country,
      })),
    [countriesDB, language]
  );

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

  const getPlaceDB = async (placeId: string): Promise<void> => {
    const queryParams = qs.stringify({
      placeId,
    });
    const placeDB = await api(
      `${PATHS.placesCityId}?${queryParams}`,
      { method: "GET" },
      z.object({
        resultDB: placeDbSchema,
      })
    );
    if (placeDB) setPlacesDB((state) => [...state, placeDB.resultDB]);
  };

  const getPlace = (placeId: string): PlaceDbType | null => {
    const placeState = placesDB.find((placeDB) => placeDB.place_id === placeId);
    if (placeState) return placeState;
    getPlaceDB(placeId);
    return null;
  };

  const getCounties = async () => {
    const result = await api(
      PATHS.placesCountries,
      { method: "GET" },
      getCountiesResultSchema
    );
    if (result) setCountriesDB(result.countries);
  };

  const getSearchCountry = async (
    searchText: string,
    isDeep = false
  ): Promise<GetSearchCountryType | null> => {
    const queryParams = qs.stringify(
      {
        searchText,
        language,
        isDeep,
      },
      { addQueryPrefix: true }
    );
    const result = await api(
      `${PATHS.placesCountriesSearch}${queryParams}`,
      { method: "GET" },
      getSearchCountrySchema
    );
    return result;
  };

  const getSearchRegion = async (
    searchText: string,
    isDeep = false
  ): Promise<GetSearchCountryType | null> => {
    const queryParams = qs.stringify(
      {
        searchText,
        language,
        isDeep,
      },
      { addQueryPrefix: true }
    );
    const result = await api(
      `${PATHS.placesRegionsSearch}${queryParams}`,
      { method: "GET" },
      getSearchCountrySchema
    );
    return result;
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
    () => ({
      places,
      placesDB,
      getSearchCountry,
      getSearchRegion,
      getSearchPlace,
      getPlace,
    }),
    [places, placesDB]
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

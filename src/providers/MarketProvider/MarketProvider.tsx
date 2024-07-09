import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import qs from "qs";
import { z } from "zod";
import { DropdownAlertType } from "react-native-dropdownalert";

// types
import {
  MinMaxPricesType,
  PlacesAllIdsType,
  ProductType,
  ProductsType,
} from "./MarketProvider.types";
import { ItemSearchPlaceType } from "../../components/ModalSheetSearchPlace/ModalSheetSearchPlace.types";

// schemas
import { productSchema, resultProductsSchema } from "./MarketProvider.schemas";
import { ratesCurrencySchema } from "../PaymentProvider/PaymentProvider.schemas";

// providers
import { userContext } from "../UserProvider/UserProvider";
import { localesContext } from "../../../localization/localization.provider";
import { apiContext } from "../ApiProvider/ApiProvider";
import { loadingContext } from "../LoadingProvider/LoadingProvider";
import { paymentContext } from "../PaymentProvider/PaymentProvider";
import { analyticsContext } from "../AnalyticsProvider/AnalyticsProvider";
import { useDropDownAlertProvider } from "../DropDownAlertProvider/DropDownAlertProvider";

// components
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";

// constants
import { PATHS } from "../paths.constants";

export type NewProductType = Omit<
  ProductType,
  | "_id"
  | "prices"
  | "userId"
  | "likeUserIds"
  | "place_id"
  | "country_place_id"
  | "region_place_id"
> & {
  userId: string;
  likeUserIds: string[];
  place?: ItemSearchPlaceType;
  place_id?: string;
  country_place_id?: string;
  region_place_id?: string;
};

type MarketContext = {
  products: ProductsType;
  addProduct: (newProduct: NewProductType) => Promise<boolean>;
  changeProduct: (changeProduct: NewProductType) => Promise<boolean>;
  deleteProduct: (idProduct: string, type?: "all" | "user") => Promise<boolean>;
  minMaxPrices: MinMaxPricesType | null;
  placesAll: PlacesAllIdsType | null;
};

type MarketProviderProps = {
  children: React.ReactNode;
};

export const marketContext = React.createContext({} as MarketContext);

export const MarketProvider: FunctionComponent<MarketProviderProps> = ({
  children,
}) => {
  const { messageFromServer } = useDropDownAlertProvider();
  const { i18n } = useContext(localesContext);
  const { userData, setUserData } = useContext(userContext);
  const { setCurrencies } = useContext(paymentContext);
  const { api } = useContext(apiContext);
  const { setLoading } = useContext(loadingContext);
  const { onSetUserProperties } = useContext(analyticsContext);
  const [products, setProducts] = useState<ProductsType>([]);
  const [idDeleteProduct, setIdDeleteProduct] = useState<string | null>(null);
  const [minMaxPrices, setMinMaxPrices] = useState<MinMaxPricesType | null>(
    null
  );
  const [placesAll, setPlacesAll] = useState<PlacesAllIdsType | null>(null);

  const setMinMaxProduct = async (product: ProductType) => {
    const isMinProduct = minMaxPrices
      ? product.price < minMaxPrices?.min[product.codeCurrency]
      : false;
    const isMaxProduct = minMaxPrices
      ? product.price > minMaxPrices?.max[product.codeCurrency]
      : false;

    if (isMinProduct || isMaxProduct) {
      const result = await api(
        PATHS.marketsProductsMinMaxPricesGet,
        null,
        z.object({
          max: ratesCurrencySchema,
          min: ratesCurrencySchema,
        })
      );
      setMinMaxPrices(result);
    }
  };

  const getProducts = async () => {
    const result = await api(
      PATHS.marketsProductsGet,
      null,
      resultProductsSchema
    );

    if (result) {
      setProducts(result.products);
      setCurrencies(result.currencies);
      setMinMaxPrices({ min: result.min, max: result.max });
      if (result.places) setPlacesAll(result.places);
    }
  };

  const getProductsUser = async () => {
    if (userData?._id) {
      const queryParams = qs.stringify(
        {
          userId: userData._id,
        },
        {
          addQueryPrefix: true,
        }
      );
      const result = await api(
        `${PATHS.marketsProductsGetUserId}${queryParams}`,
        null,
        resultProductsSchema
      );
      if (result) {
        setCurrencies(result.currencies);
        setMinMaxPrices({ min: result.min, max: result.max });
      }
    }
  };

  const addProduct = async (newProduct: NewProductType): Promise<boolean> => {
    setLoading(true);
    const result = await api(
      PATHS.marketsProductsAdd,
      {
        method: "POST",
        data: newProduct,
      },
      z.object({ product: productSchema })
    );
    if (result?.product) {
      setProducts((state) => [...state, result.product]);
      setLoading(false);
      setMinMaxProduct(result.product);
      if (userData) {
        setUserData({
          ...userData,
          productsIds: [...userData.productsIds, result.product],
        });
        await onSetUserProperties({
          amountWorkshops: (userData.workshopsIds.length + 1).toString(),
        });
      }
      return true;
    }
    setLoading(false);
    return false;
  };

  const changeProduct = async (changeProduct: NewProductType) => {
    setLoading(true);
    const result = await api(
      PATHS.marketsProductsChange,
      {
        method: "POST",
        data: changeProduct,
      },
      z.object({ product: productSchema })
    );
    if (result?.product) {
      setProducts((state) =>
        state.map((product) =>
          product._id === result.product._id ? result.product : product
        )
      );
      if (userData) {
        setUserData({
          ...userData,
          productsIds: userData.productsIds.map((product) =>
            product._id === result.product._id ? result.product : product
          ),
        });
      }
      setMinMaxProduct(result.product);
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const deleteProduct = async (
    idProduct: string,
    type: "all" | "user" = "all"
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const result = await api(
        PATHS.marketsProductsDelete,
        { method: "DELETE", data: { _id: idProduct } },
        z.object({ result: z.boolean() })
      );
      if (result?.result) {
        setProducts((state) =>
          state.filter((product) => product._id !== idProduct)
        );
        if (type === "user") {
          if (userData && userData.productsIds.length > 0) {
            setUserData({
              ...userData,
              productsIds: userData.productsIds.filter(
                (product) => product._id !== idProduct
              ),
            });
            await onSetUserProperties({
              amountProducts: (userData.productsIds.length - 1).toString(),
            });
          }
        }
      }

      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const valueContext: MarketContext = useMemo(
    () => ({
      products,
      addProduct,
      changeProduct,
      deleteProduct,
      minMaxPrices,
      placesAll,
    }),
    [products, minMaxPrices, placesAll]
  );

  useEffect(() => {
    if (userData?._id) {
      getProducts();
      getProductsUser();
    }
  }, [userData?._id]);

  return (
    <marketContext.Provider value={valueContext}>
      {children}
      {idDeleteProduct?.length ? (
        <ModalDelete
          onSubmit={async () => {
            await deleteProduct(idDeleteProduct, "user");
            messageFromServer(
              i18n._("Advert delete"),
              i18n._("Success"),
              DropdownAlertType.Success
            );
            setIdDeleteProduct(null);
          }}
          onClose={() => {
            setIdDeleteProduct(null);
          }}
        />
      ) : null}
    </marketContext.Provider>
  );
};

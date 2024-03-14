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
  MinMaxPricesType,
  PlacesAllIdsType,
  ProductType,
  ProductsType,
} from "./MarketProvider.types";
import { ItemSearchPlaceType } from "../../components/ModalSheetSearchPlace/ModalSheetSearchPlace.types";

// schemas
import { productSchema, resultProductsSchema } from "./MarketProvider.schemas";
import { ratesCurrencySchema } from "../PaymentProvider/PaymentProvider.schemas";

// helps
import showErrors from "../../helps/errors/showError";

// providers
import { userContext } from "../UserProvider/UserProvider";
import { localesContext } from "../../../localization/localization.provider";
import { apiContext } from "../ApiProvider/ApiProvider";
import { loadingContext } from "../LoadingProvider/LoadingProvider";
import { paymentContext } from "../PaymentProvider/PaymentProvider";
import { analyticsContext } from "../AnalyticsProvider/AnalyticsProvider";

// components
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";

// constants
import { PATHS } from "../paths.constants";

type MarketContext = {
  products: ProductsType;
  productsUser: ProductsType;
  addProduct: (
    newProduct: Omit<ProductType, "id" | "prices"> & {
      place?: ItemSearchPlaceType;
    }
  ) => Promise<boolean>;
  changeProduct: (changeProduct: ProductType) => Promise<boolean>;
  deleteProduct: (idProduct: number, type?: "all" | "user") => Promise<boolean>;
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
  const { i18n } = useContext(localesContext);
  const { userData } = useContext(userContext);
  const { setCurrencies } = useContext(paymentContext);
  const { api } = useContext(apiContext);
  const { setLoading } = useContext(loadingContext);
  const { onSetUserProperties } = useContext(analyticsContext);
  const [products, setProducts] = useState<ProductsType>([]);
  const [productsUser, setProductsUser] = useState<ProductsType>([]);
  const [idDeleteProduct, setIdDeleteProduct] = useState<number | null>(null);
  const [minMaxPrices, setMinMaxPrices] = useState<MinMaxPricesType | null>(
    null
  );
  const [placesAll, setPlacesAll] = useState<PlacesAllIdsType | null>(null);
  const { success } = showErrors;

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
    if (userData?.id) {
      const queryParams = qs.stringify(
        {
          userId: userData.id,
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
        setProductsUser(result.products);
        setCurrencies(result.currencies);
        setMinMaxPrices({ min: result.min, max: result.max });
      }
    }
  };

  const addProduct = async (
    newProduct: Omit<ProductType, "id" | "prices">
  ): Promise<boolean> => {
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
      setProductsUser((state) => [...state, result.product]);
      setProducts((state) => [...state, result.product]);
      setLoading(false);
      setMinMaxProduct(result.product);
      if (userData)
        await onSetUserProperties({
          amountWorkshops: (userData.workshopsIds.length + 1).toString(),
        });
      return true;
    }
    setLoading(false);
    return false;
  };

  const changeProduct = async (
    changeProduct: Omit<ProductType, "id" | "prices"> & {
      place?: ItemSearchPlaceType;
    }
  ) => {
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
      setProductsUser((state) =>
        state.map((product) =>
          product.id === result.product.id ? result.product : product
        )
      );
      setProducts((state) =>
        state.map((product) =>
          product.id === result.product.id ? result.product : product
        )
      );
      setMinMaxProduct(result.product);
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const deleteProduct = async (
    idProduct: number,
    type: "all" | "user" = "all"
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const result = await api(
        PATHS.marketsProductsDelete,
        { method: "DELETE", data: { id: idProduct } },
        z.object({ result: z.boolean() })
      );
      if (result?.result) {
        setProducts((state) =>
          state.filter((product) => product.id !== idProduct)
        );
        if (type === "user") {
          setProductsUser((state) =>
            state.filter((product) => product.id !== idProduct)
          );
          if (userData && userData.productsIds.length > 0)
            await onSetUserProperties({
              amountProducts: (userData.productsIds.length - 1).toString(),
            });
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
      productsUser,
      addProduct,
      changeProduct,
      deleteProduct,
      minMaxPrices,
      placesAll,
    }),
    [products, productsUser, minMaxPrices, placesAll]
  );

  useEffect(() => {
    if (userData?.id) {
      getProducts();
      getProductsUser();
    }
  }, [userData?.id]);

  return (
    <marketContext.Provider value={valueContext}>
      {children}
      {idDeleteProduct ? (
        <ModalDelete
          onSubmit={async () => {
            await deleteProduct(idDeleteProduct, "user");
            success(i18n._("Advert delete"));
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

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
import { ProductType, ProductsType } from "./MarketProvider.types";

// schemas
import { productSchema, resultProductsSchema } from "./MarketProvider.schemas";

// helps
import showErrors from "../../helps/errors/showError";

// providers
import { userContext } from "../UserProvider/UserProvider";
import { localesContext } from "../../../localization/localization.provider";
import { apiContext } from "../ApiProvider/ApiProvider";
import { loadingContext } from "../LoadingProvider/LoadingProvider";

// components
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";

// constants
import { PATHS } from "../paths.constants";

type MarketContext = {
  products: ProductsType;
  productsUser: ProductsType;
  addProduct: (newProduct: Omit<ProductType, "id">) => Promise<boolean>;
  changeProduct: (changeProduct: ProductType) => Promise<boolean>;
  deleteProduct: (idProduct: number, type?: "all" | "user") => Promise<boolean>;
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
  const { api } = useContext(apiContext);
  const { setLoading } = useContext(loadingContext);
  const [products, setProducts] = useState<ProductsType>([]);
  const [productsUser, setProductsUser] = useState<ProductsType>([]);
  const [idDeleteProduct, setIdDeleteProduct] = useState<number | null>(null);
  const { success } = showErrors;

  const getProducts = async () => {
    const result = await api(
      PATHS.marketsProductsGet,
      null,
      resultProductsSchema
    );
    if (result?.products) setProducts(result.products);
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
      if (result?.products) setProductsUser(result.products);
    }
  };

  const addProduct = async (
    newProduct: Omit<ProductType, "id">
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
      return true;
    }
    setLoading(false);
    return false;
  };

  const changeProduct = async (changeProduct: ProductType) => {
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
        if (type === "user")
          setProductsUser((state) =>
            state.filter((product) => product.id !== idProduct)
          );
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
    }),
    [products, productsUser]
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
            success(i18n._("Product delete"));
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

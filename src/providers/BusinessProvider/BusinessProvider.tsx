import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { z } from "zod";
import qs from "qs";

// schemas
import { businessMarketSchema } from "./BusinessProvider.schemas";

// types
import { BusinessMarketType } from "./BusinessProvider.types";

// providers
import { userContext } from "../UserProvider/UserProvider";
import { apiContext } from "../ApiProvider/ApiProvider";

// components
import { ItemSearchPlaceAddressType } from "../../components/ModalSheetSearchPlaceAddress/ModalSheetSearchPlaceAddress.types";
import { ImageType } from "../../components/ImageModal/ImageModal.types";

// constants
import { PATHS } from "../paths.constants";

type BusinessContext = {
  businessMarketUser: BusinessMarketType | null;
  onCreateBusinessMarket: (
    newBusinessMarket: Omit<BusinessMarketType, "place" | "logo" | "id"> & {
      place: ItemSearchPlaceAddressType;
      newLogo: ImageType | null;
    }
  ) => Promise<boolean>;
  onDeleteBusinessMarket: () => Promise<boolean>;
};

type BusinessProviderProps = {
  children: React.ReactNode;
};

export const businessContext = React.createContext({} as BusinessContext);

export const BusinessProvider: FunctionComponent<BusinessProviderProps> = ({
  children,
}) => {
  const { api } = useContext(apiContext);
  const { userData } = useContext(userContext);
  const [businessMarketUser, setBusinessMarketUser] =
    useState<BusinessMarketType | null>(null);

  const getBusinessUser = async (userId?: string | number) => {
    if (!userData?.id) return false;
    const query = qs.stringify({ userId }, { addQueryPrefix: true });
    const result = await api(
      `${PATHS.businessMarket}${query}`,
      null,
      z.object({ businessMarket: businessMarketSchema.nullable() })
    );
    if (result?.businessMarket) setBusinessMarketUser(result.businessMarket);
    return Boolean(result?.businessMarket);
  };

  const onCreateBusinessMarket = async (
    newBusinessMarket: Omit<BusinessMarketType, "place" | "logo" | "id"> & {
      place: ItemSearchPlaceAddressType;
      newLogo: ImageType | null;
    }
  ) => {
    if (!userData?.id || !newBusinessMarket.place) return false;
    const result = await api(
      PATHS.businessMarketCreate,
      { method: "POST", data: newBusinessMarket },
      z.object({ businessMarket: businessMarketSchema })
    );
    if (result?.businessMarket) setBusinessMarketUser(result.businessMarket);
    return Boolean(result?.businessMarket);
  };

  const onDeleteBusinessMarket = async () => {
    if (!businessMarketUser?.id || !userData?.id) return false;
    const result = await api(
      PATHS.businessMarketDelete,
      {
        method: "DELETE",
        data: {
          userId: userData.id,
          businessMarketId: businessMarketUser.id,
        },
      },
      z.object({ success: z.boolean() })
    );

    if (result) setBusinessMarketUser(null);
    return true;
  };

  const valueContext: BusinessContext = useMemo(
    () => ({
      businessMarketUser,
      onCreateBusinessMarket,
      onDeleteBusinessMarket,
    }),
    [businessMarketUser]
  );

  useEffect(() => {
    if (userData?.id) getBusinessUser(userData.id);
  }, [userData?.id]);

  return (
    <businessContext.Provider value={valueContext}>
      {children}
    </businessContext.Provider>
  );
};

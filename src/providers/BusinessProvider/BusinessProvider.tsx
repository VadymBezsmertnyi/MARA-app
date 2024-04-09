import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Modal } from "react-native";
import { z } from "zod";
import qs from "qs";

// schemas
import { businessMarketSchema } from "./BusinessProvider.schemas";

// types
import { BusinessMarketType } from "./BusinessProvider.types";

// providers
import { userContext } from "../UserProvider/UserProvider";
import { apiContext } from "../ApiProvider/ApiProvider";
import { localesContext } from "../../../localization/localization.provider";

// components
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";
import { ItemSearchPlaceAddressType } from "../../components/ModalSheetSearchPlaceAddress/ModalSheetSearchPlaceAddress.types";
import { ImageType } from "../../components/ImageModal/ImageModal.types";

// constants
import { PATHS } from "../paths.constants";

type BusinessContext = {
  businessMarketUser: BusinessMarketType | null;
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
  onCreateBusinessMarket: (
    newBusinessMarket: Omit<BusinessMarketType, "place" | "logo" | "id"> & {
      place: ItemSearchPlaceAddressType;
      newLogo: ImageType | null;
    }
  ) => Promise<void>;
};

type BusinessProviderProps = {
  children: React.ReactNode;
};

export const businessContext = React.createContext({} as BusinessContext);

export const BusinessProvider: FunctionComponent<BusinessProviderProps> = ({
  children,
}) => {
  const { i18n } = useContext(localesContext);
  const { api } = useContext(apiContext);
  const { userData } = useContext(userContext);
  const [isDelete, setIsDelete] = useState(false);
  const [businessMarketUser, setBusinessMarketUser] =
    useState<BusinessMarketType | null>(null);

  const getBusinessUser = async (userId?: string | number) => {
    if (!userData?.id) return null;
    const query = qs.stringify({ userId }, { addQueryPrefix: true });
    const result = await api(`${PATHS.businessMarket}${query}`, null);
    setBusinessMarketUser(result.businessMarket);
  };

  const onCreateBusinessMarket = async (
    newBusinessMarket: Omit<BusinessMarketType, "place" | "logo" | "id"> & {
      place: ItemSearchPlaceAddressType;
      newLogo: ImageType | null;
    }
  ) => {
    const result = await api(
      PATHS.businessMarketCreate,
      { method: "POST", data: newBusinessMarket },
      z.object({ businessMarket: businessMarketSchema })
    );
    if (result?.businessMarket) setBusinessMarketUser(result.businessMarket);
  };

  const valueContext: BusinessContext = useMemo(
    () => ({ businessMarketUser, setIsDelete, onCreateBusinessMarket }),
    [businessMarketUser]
  );

  useEffect(() => {
    if (userData?.id) getBusinessUser(userData.id);
  }, [userData?.id]);

  return (
    <businessContext.Provider value={valueContext}>
      {children}
      {isDelete && businessMarketUser ? (
        <Modal visible transparent>
          <ModalDelete
            onSubmit={() => {}}
            onClose={() => {
              setIsDelete(false);
            }}
            subTitle={i18n._(
              `Attention! All data related to the "{nameBusiness}" business will be deleted.`,
              { nameBusiness: businessMarketUser.name }
            )}
          />
        </Modal>
      ) : null}
    </businessContext.Provider>
  );
};

import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// providers
import { userContext } from "../UserProvider/UserProvider";
import { localesContext } from "../../../localization/localization.provider";

// components
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";
import { BusinessMarketType } from "./BusinessProvider.types";

type BusinessContext = {
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
};

type BusinessProviderProps = {
  children: React.ReactNode;
};

export const businessContext = React.createContext({} as BusinessContext);

export const BusinessProvider: FunctionComponent<BusinessProviderProps> = ({
  children,
}) => {
  const { i18n } = useContext(localesContext);
  const { userData } = useContext(userContext);
  const [isDelete, setIsDelete] = useState(false);
  const [businessUser, setBusinessUser] = useState<BusinessMarketType | null>(
    null
  );

  const valueContext: BusinessContext = useMemo(() => ({ setIsDelete }), []);

  const getBusinessUser = async () => {
    if (userData?.id) return null;
  };

  useEffect(() => {
    if (userData?.id) getBusinessUser();
  }, [userData?.id]);

  return (
    <businessContext.Provider value={valueContext}>
      {children}
      {isDelete ? (
        <ModalDelete
          onSubmit={async () => {}}
          onClose={() => {
            setIsDelete(false);
          }}
        />
      ) : null}
    </businessContext.Provider>
  );
};

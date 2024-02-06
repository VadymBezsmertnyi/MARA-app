import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { z } from "zod";
import qs from "qs";

// types
import { WorkshopType, WorkshopsType } from "./WorkshopsProvider.types";

// providers
import { ResponsiveLayoutProvider } from "../responsiveLayout/responsiveLayout.provider";
import { apiContext } from "../ApiProvider/ApiProvider";
import { loadingContext } from "../LoadingProvider/LoadingProvider";
import { userContext } from "../UserProvider/UserProvider";

// schemas
import { workshopSchema, workshopsSchema } from "./WorkshopsProvider.schemas";

// components
import { ModalsSheet } from "../../components/ModalsSheet/ModalsSheet";
import { ModalComment } from "./components/ModalComment/ModalComment";

// constants
import { PATHS } from "../paths.constants";

type WorkshopsContext = {
  workshops: WorkshopsType;
  workshopsUser: WorkshopsType;
  setIdComment: React.Dispatch<React.SetStateAction<number | null>>;
  addWorkshop: (newWorkshop: Omit<WorkshopType, "id">) => Promise<boolean>;
};

type WorkshopsProviderProps = {
  children: React.ReactNode;
};

export const workshopsContext = React.createContext({} as WorkshopsContext);

export const WorkshopsProvider: FunctionComponent<WorkshopsProviderProps> = ({
  children,
}) => {
  const { api } = useContext(apiContext);
  const { setLoading } = useContext(loadingContext);
  const { userData } = useContext(userContext);
  const [workshops, setWorkShops] = useState<WorkshopsType>([]);
  const [workshopsUser, setWorkShopsUser] = useState<WorkshopsType>([]);
  const [idComment, setIdComment] = useState<number | null>(null);

  const showModal = useMemo(() => {
    if (idComment !== null) return <ModalComment />;
    return null;
  }, [idComment]);

  const onClose = () => {
    setIdComment(null);
  };

  const getWorkshops = async () => {
    const result = await api(
      PATHS.workshopsGet,
      null,
      z.object({
        result: z.boolean(),
        workshops: workshopsSchema,
        code: z.number(),
      })
    );
    if (result?.workshops) setWorkShops(result.workshops);
  };

  const getWorkshopsUser = async () => {
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
        `${PATHS.workshopsGetUserId}${queryParams}`,
        null,
        z.object({
          result: z.boolean(),
          workshops: workshopsSchema,
          code: z.number(),
        })
      );
      if (result?.workshops) setWorkShopsUser(result.workshops);
    }
  };

  const addWorkshop = async (newWorkshop: Omit<WorkshopType, "id">) => {
    setLoading(true);
    if (userData?.id) {
      const data = { ...newWorkshop, userId: userData.id };
      const result = await api(
        PATHS.workshopsAdd,
        {
          method: "POST",
          data,
        },
        z.object({ workshop: workshopSchema })
      );
      if (result?.workshop) {
        setWorkShops((state) => [...state, result.workshop]);
        setWorkShopsUser((state) => [...state, result.workshop]);
        setLoading(false);
        return true;
      }
      setLoading(false);
      return false;
    }
    setLoading(false);
    return false;
  };

  const valueContext: WorkshopsContext = useMemo(
    () => ({
      workshops,
      workshopsUser,
      setIdComment,
      addWorkshop,
    }),
    [workshops]
  );

  useEffect(() => {
    if (userData?.id) {
      getWorkshops();
      getWorkshopsUser();
    }
  }, [userData?.id]);

  return (
    <ResponsiveLayoutProvider>
      <workshopsContext.Provider value={valueContext}>
        {children}
        {showModal ? (
          <ModalsSheet onClose={onClose}>{showModal}</ModalsSheet>
        ) : null}
      </workshopsContext.Provider>
    </ResponsiveLayoutProvider>
  );
};

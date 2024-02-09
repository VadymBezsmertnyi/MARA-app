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
import {
  CommentType,
  WorkshopType,
  WorkshopsType,
} from "./WorkshopsProvider.types";

// providers
import { ResponsiveLayoutProvider } from "../responsiveLayout/responsiveLayout.provider";
import { apiContext } from "../ApiProvider/ApiProvider";
import { loadingContext } from "../LoadingProvider/LoadingProvider";
import { userContext } from "../UserProvider/UserProvider";

// schemas
import { workshopSchema, workshopsSchema } from "./WorkshopsProvider.schemas";

// constants
import { PATHS } from "../paths.constants";

type WorkshopsContext = {
  workshops: WorkshopsType;
  workshopsUser: WorkshopsType;
  addWorkshop: (newWorkshop: Omit<WorkshopType, "id">) => Promise<boolean>;
  changeWorkshop: (changeWorkshop: WorkshopType) => Promise<boolean>;
  deleteWorkshop: (
    idWorkshop: number,
    type?: "all" | "user"
  ) => Promise<boolean>;
  addComment: (
    idWorkshop: number,
    newComment: Omit<CommentType, "id">
  ) => Promise<boolean>;
  changeComment: (
    idWorkshop: number,
    changeComment: CommentType
  ) => Promise<boolean>;
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

  const changeWorkshop = async (changeWorkshop: WorkshopType) => {
    setLoading(true);
    const result = await api(
      PATHS.workshopsChange,
      {
        method: "PUT",
        data: changeWorkshop,
      },
      z.object({ workshop: workshopSchema })
    );
    if (result?.workshop) {
      setWorkShopsUser((state) =>
        state.map((workshop) =>
          workshop.id === result.workshop.id ? result.workshop : workshop
        )
      );
      setWorkShops((state) =>
        state.map((workshop) =>
          workshop.id === result.workshop.id ? result.workshop : workshop
        )
      );
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const deleteWorkshop = async (
    idWorkshop: number,
    type: "all" | "user" = "all"
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const result = await api(
        PATHS.workshopsDelete,
        { method: "DELETE", data: { id: idWorkshop } },
        z.object({ result: z.boolean() })
      );
      if (result?.result) {
        setWorkShops((state) =>
          state.filter((workshop) => workshop.id !== idWorkshop)
        );
        if (type === "user")
          setWorkShopsUser((state) =>
            state.filter((workshop) => workshop.id !== idWorkshop)
          );
      }

      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (
    idWorkshop: number,
    newComment: Omit<CommentType, "id">
  ) => {
    setLoading(true);
    const result = await api(
      PATHS.workshopsCommentsAdd,
      {
        method: "POST",
        data: { idWorkshop, ...newComment },
      },
      z.object({ workshop: workshopSchema })
    );

    if (result?.workshop) {
      setWorkShops((state) =>
        state.map((item) =>
          item.id === result.workshop.id ? result.workshop : item
        )
      );
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const changeComment = async (
    idWorkshop: number,
    changeComment: CommentType
  ) => {
    setLoading(true);
    const result = await api(
      PATHS.workshopsCommentsChange,
      {
        method: "PUT",
        data: { idWorkshop, ...changeComment },
      },
      z.object({ workshop: workshopSchema })
    );

    if (result?.workshop) {
      setWorkShops((state) =>
        state.map((item) =>
          item.id === result.workshop.id ? result.workshop : item
        )
      );
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const valueContext: WorkshopsContext = useMemo(
    () => ({
      workshops,
      workshopsUser,
      addWorkshop,
      changeWorkshop,
      deleteWorkshop,
      addComment,
      changeComment,
    }),
    [workshops, workshopsUser]
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
      </workshopsContext.Provider>
    </ResponsiveLayoutProvider>
  );
};

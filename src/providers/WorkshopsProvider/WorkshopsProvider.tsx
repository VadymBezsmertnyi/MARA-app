import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { z } from "zod";
import qs from "qs";
import { convertDistance, getDistance } from "geolib";

// types
import {
  CommentType,
  WorkshopType,
  WorkshopsType,
} from "./WorkshopsProvider.types";
import { ItemSearchPlaceAddressType } from "../../components/ModalSheetSearchPlaceAddress/ModalSheetSearchPlaceAddress.types";

// providers
import { apiContext } from "../ApiProvider/ApiProvider";
import { loadingContext } from "../LoadingProvider/LoadingProvider";
import { userContext } from "../UserProvider/UserProvider";
import { mapContext } from "../MapProvider/MapProvider";
import { analyticsContext } from "../AnalyticsProvider/AnalyticsProvider";

// schemas
import { workshopSchema, workshopsSchema } from "./WorkshopsProvider.schemas";

// constants
import { PATHS } from "../paths.constants";

type NewWorkshopType = Omit<WorkshopType, "_id" | "userId"> & {
  userId: string;
};
type ChangeWorkshopType = Omit<WorkshopType, "userId"> & { userId: string };

type WorkshopsContext = {
  workshops: WorkshopsType;
  addWorkshop: (newWorkshop: NewWorkshopType) => Promise<boolean>;
  changeWorkshop: (changeWorkshop: ChangeWorkshopType) => Promise<boolean>;
  deleteWorkshop: (
    idWorkshop: string,
    type?: "all" | "user"
  ) => Promise<boolean>;
  addComment: (
    idWorkshop: string,
    newComment: Omit<CommentType, "_id">
  ) => Promise<boolean>;
  changeComment: (
    idWorkshop: string,
    changeComment: CommentType
  ) => Promise<boolean>;
  minMaxDistance: {
    min: number;
    max: number;
  };
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
  const { userData, setUserData } = useContext(userContext);
  const { location } = useContext(mapContext);
  const { onSetUserProperties } = useContext(analyticsContext);
  const [workshops, setWorkShops] = useState<WorkshopsType>([]);
  const minMaxDistance = useMemo(() => {
    const distanceMinMax = workshops
      .map((workshop) =>
        location && workshop.coordinates
          ? convertDistance(
              getDistance(location, {
                longitude: workshop.coordinates.longitude,
                latitude: workshop.coordinates.latitude,
              }),
              "km"
            )
          : 0
      )
      .sort((a, b) => a - b);
    return {
      min: distanceMinMax.length > 0 ? Number(distanceMinMax[0].toFixed()) : 0,
      max:
        distanceMinMax.length > 1
          ? Number(distanceMinMax[distanceMinMax.length - 1].toFixed())
          : 200,
    };
  }, [workshops]);

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

  const addWorkshop = async (newWorkshop: NewWorkshopType) => {
    setLoading(true);
    if (!userData) {
      setLoading(false);
      return false;
    }

    const data = { ...newWorkshop, userId: userData._id };
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
      setUserData((state) => {
        if (state) {
          return {
            ...state,
            workshopsIds: [...state.workshopsIds, result.workshop],
          };
        }
        return state;
      });
      setLoading(false);
      await onSetUserProperties({
        amountWorkshops: (userData.workshopsIds.length + 1).toString(),
      });
      return true;
    }
    setLoading(false);
    return false;
  };

  const changeWorkshop = async (changeWorkshop: ChangeWorkshopType) => {
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
      setWorkShops((state) =>
        state.map((workshop) =>
          workshop._id === result.workshop._id ? result.workshop : workshop
        )
      );
      setUserData((state) => {
        if (state) {
          return {
            ...state,
            workshopsIds: state.workshopsIds.map((workshop) =>
              workshop._id === result.workshop._id ? result.workshop : workshop
            ),
          };
        }
        return state;
      });
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const deleteWorkshop = async (
    idWorkshop: string,
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
          state.filter((workshop) => workshop._id !== idWorkshop)
        );
        if (type === "user") {
          if (userData && userData.workshopsIds.length > 0)
            await onSetUserProperties({
              amountWorkshops: (userData.workshopsIds.length - 1).toString(),
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

  const addComment = async (
    idWorkshop: string,
    newComment: Omit<CommentType, "_id">
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
          item._id === result.workshop._id ? result.workshop : item
        )
      );
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const changeComment = async (
    idWorkshop: string,
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
          item._id === result.workshop._id ? result.workshop : item
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
      minMaxDistance,
      addWorkshop,
      changeWorkshop,
      deleteWorkshop,
      addComment,
      changeComment,
    }),
    [workshops, minMaxDistance]
  );

  useEffect(() => {
    if (userData?._id) {
      getWorkshops();
    }
  }, [userData?._id]);

  return (
    <workshopsContext.Provider value={valueContext}>
      {children}
    </workshopsContext.Provider>
  );
};

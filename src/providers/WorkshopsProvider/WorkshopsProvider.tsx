import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { z } from "zod";
import { convertDistance, getDistance } from "geolib";

// types
import {
  CommentType,
  WorkshopType,
  WorkshopsType,
} from "./WorkshopsProvider.types";

// providers
import { useApiProvider } from "../ApiProvider/ApiProvider";
import { useLoadingProvider } from "../LoadingProvider/LoadingProvider";
import { useUserProvider } from "../UserProvider/UserProvider";
import { useMapProvider } from "../MapProvider/MapProvider";
import { useAnalyticsProvider } from "../AnalyticsProvider/AnalyticsProvider";

// schemas
import { workshopSchema, workshopsSchema } from "./WorkshopsProvider.schemas";

// constants
import { PATHS } from "../paths.constants";

type NewWorkshopType = Omit<WorkshopType, "_id" | "userId"> & {
  userId: string;
};
type ChangeWorkshopType = Omit<WorkshopType, "userId" | "likeUserIds"> & {
  userId: string;
  likeUserIds: string[];
};

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

const WorkshopsProvider: FunctionComponent<WorkshopsProviderProps> = ({
  children,
}) => {
  const { api } = useApiProvider();
  const { setLoading } = useLoadingProvider();
  const { userData, setUserData, meUser } = useUserProvider();
  const { location } = useMapProvider();
  const { onSetUserProperties } = useAnalyticsProvider();
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

    const formData = new FormData();

    const newImageFiles =
      newWorkshop.imageFiles?.filter(
        (img) => img.url.includes("data:image") || img.url.includes("file://")
      ) || [];
    const existingImageFiles =
      newWorkshop.imageFiles?.filter(
        (img) => !img.url.includes("data:image") && !img.url.includes("file://")
      ) || [];

    newImageFiles.forEach((img, index) => {
      if (img.url.includes("data:image") || img.url.includes("file://")) {
        const fileExtension = img.url.split(".").pop() || "jpg";
        const fileName = `image_${index}.${fileExtension}`;
        formData.append("imageFiles", {
          uri: img.url,
          type: "image/jpeg",
          name: fileName,
        } as any);
      }
    });

    Object.keys(newWorkshop).forEach((key) => {
      if (key !== "imageFiles") {
        const value = (newWorkshop as any)[key];
        if (value !== undefined && value !== null) {
          if (
            typeof value === "object" &&
            !Array.isArray(value) &&
            !(value instanceof Date)
          )
            formData.append(key, JSON.stringify(value));
          else if (Array.isArray(value))
            formData.append(key, JSON.stringify(value));
          else formData.append(key, String(value));
        }
      }
    });
    if (existingImageFiles.length > 0)
      formData.append(
        "existingImages",
        JSON.stringify(
          existingImageFiles.map((img) => ({
            _id: img._id,
            url: img.url,
          }))
        )
      );

    formData.append("userId", userData._id);

    const result = await api(
      PATHS.workshopsAdd,
      {
        method: "POST",
        data: formData,
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
      meUser(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const changeWorkshop = async (changeWorkshop: ChangeWorkshopType) => {
    setLoading(true);
    const formData = new FormData();

    const newImageFiles =
      changeWorkshop.imageFiles?.filter(
        (img) => img.url.includes("data:image") || img.url.includes("file://")
      ) || [];
    const existingImageFiles =
      changeWorkshop.imageFiles?.filter(
        (img) => !img.url.includes("data:image") && !img.url.includes("file://")
      ) || [];

    newImageFiles.forEach((img, index) => {
      if (img.url.includes("data:image") || img.url.includes("file://")) {
        const fileExtension = img.url.split(".").pop() || "jpg";
        const fileName = `image_${index}.${fileExtension}`;
        formData.append("imageFiles", {
          uri: img.url,
          type: "image/jpeg",
          name: fileName,
        } as any);
      }
    });

    Object.keys(changeWorkshop).forEach((key) => {
      if (key !== "imageFiles") {
        const value = (changeWorkshop as any)[key];
        if (value !== undefined && value !== null) {
          if (
            typeof value === "object" &&
            !Array.isArray(value) &&
            !(value instanceof Date)
          )
            formData.append(key, JSON.stringify(value));
          else if (Array.isArray(value))
            formData.append(key, JSON.stringify(value));
          else formData.append(key, String(value));
        }
      }
    });
    if (existingImageFiles.length > 0)
      formData.append(
        "existingImages",
        JSON.stringify(
          existingImageFiles.map((img) => ({
            _id: img._id,
            url: img.url,
          }))
        )
      );

    const result = await api(
      PATHS.workshopsChange,
      {
        method: "PUT",
        data: formData,
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
      meUser(false);
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
        { method: "DELETE", data: { _id: idWorkshop } },
        z.object({ result: z.boolean() })
      );
      if (result?.result) {
        setWorkShops((state) =>
          state.filter((workshop) => workshop._id !== idWorkshop)
        );
        if (type === "user") {
          if (userData && userData.workshopsIds.length > 0) {
            setUserData({
              ...userData,
              workshopsIds: userData.workshopsIds.filter(
                (workshop) => workshop._id !== idWorkshop
              ),
            });
            await onSetUserProperties({
              amountWorkshops: (userData.workshopsIds.length - 1).toString(),
            });
          }
        }
      }

      meUser(false);
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
      meUser(false);
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
      meUser(false);
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

export const useWorkshopsProvider = () => useContext(workshopsContext);

export default WorkshopsProvider;

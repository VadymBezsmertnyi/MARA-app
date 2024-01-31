import React, { FunctionComponent, useMemo, useState } from "react";

// providers
import { ResponsiveLayoutProvider } from "../responsiveLayout/responsiveLayout.provider";

// components
import { ModalsSheet } from "../../components/ModalsSheet/ModalsSheet";
import { ModalComment } from "./components/ModalComment/ModalComment";

// types
import { WorkshopsT } from "./WorkshopsProvider.types";

type WorkshopsContext = {
  workshops: WorkshopsT;
  valueSearch: string;
  setValueSearch: (value: string) => void;
  setIdComment: React.Dispatch<React.SetStateAction<number | null>>;
};

type WorkshopsProviderProps = {
  children: React.ReactNode;
};

const DEFAULT_LIST: WorkshopsT = [
  {
    id: 1,
    title: "Test name 1",
    description:
      "test 1 description test description test description test description test description test description test description test description test description v test description",
    address: "lane testing 1",
    rating: 5.0,
    longitude: 32.06249489431158,
    latitude: 49.42846082177688,
  },
  {
    id: 2,
    title: "Test name 2",
    description:
      "test 2 description test description test description test description test description test description test description test description test description v test description",
    address: "lane testing 2",
    rating: 4.1,
    longitude: 32.06618206226458,
    latitude: 49.438299503207254,
  },
];

export const workshopsContext = React.createContext({} as WorkshopsContext);

export const WorkshopsProvider: FunctionComponent<WorkshopsProviderProps> = ({
  children,
}) => {
  const [workshops, setWorkShops] = useState<WorkshopsT>(DEFAULT_LIST);
  const [valueSearch, setValueSearch] = useState("");
  const [idComment, setIdComment] = useState<number | null>(null);

  const showModal = useMemo(() => {
    if (idComment !== null) return <ModalComment />;
    return null;
  }, [idComment]);

  const onClose = () => {
    setIdComment(null);
  };

  const valueContext: WorkshopsContext = useMemo(
    () => ({
      workshops,
      valueSearch,
      setValueSearch,
      setIdComment,
    }),
    [valueSearch, workshops]
  );

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

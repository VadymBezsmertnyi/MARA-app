import React, { FunctionComponent, useMemo, useState } from "react";

// providers
import { ResponsiveLayoutProvider } from "../responsiveLayout/responsiveLayout.provider";

// types
import { WorkshopsT } from "./WorkshopsProvider.types";

type WorkshopsContext = {
  workshops: WorkshopsT;
  valueSearch: string;
  setValueSearch: (value: string) => void;
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

  const valueContext: WorkshopsContext = useMemo(
    () => ({
      workshops,
      valueSearch,
      setValueSearch,
    }),
    [valueSearch, workshops]
  );

  return (
    <ResponsiveLayoutProvider>
      <workshopsContext.Provider value={valueContext}>
        {children}
      </workshopsContext.Provider>
    </ResponsiveLayoutProvider>
  );
};

import React, { FunctionComponent, useMemo, useState } from 'react';

// types
import { WorkshopsT } from './workshops.types';

// components
import { SheetSearch } from './components/SheetSearch/SheetSearch';

// helps
import { searchTextInArray } from '../../helps/helps';
import { ResponsiveLayoutProvider } from '../responsiveLayout/responsiveLayout.provider';

type WorkshopsContext = {
  workshops: WorkshopsT;
  isSearchMap: boolean;
  setIsSearchMap: (value: boolean) => void;
  valueSearch: string;
  setValueSearch: (value: string) => void;
};

type WorkshopsProviderProps = {
  children: React.ReactNode;
};

const DEFAULT_LIST: WorkshopsT = [
  {
    id: 1,
    title: 'Test name 1',
    description:
      'test 1 description test description test description test description test description test description test description test description test description v test description',
    address: 'lane testing 1',
    rating: 5.0,
    longitude: 32.06249489431158,
    latitude: 49.42846082177688,
  },
  {
    id: 2,
    title: 'Test name 2',
    description:
      'test 2 description test description test description test description test description test description test description test description test description v test description',
    address: 'lane testing 2',
    rating: 4.1,
    longitude: 32.06618206226458,
    latitude: 49.438299503207254,
  },
];

export const workshopsContext = React.createContext({} as WorkshopsContext);

export const WorkshopsProvider: FunctionComponent<WorkshopsProviderProps> = ({ children }) => {
  const [workshops, setWorkShops] = useState<WorkshopsT>(DEFAULT_LIST);
  const [isSearchMap, setIsSearchMap] = useState(false);
  const [valueSearch, setValueSearch] = useState('');

  const filterWorkshop = useMemo(
    () => searchTextInArray(valueSearch, workshops),
    [valueSearch, workshops],
  );

  const valueContext: WorkshopsContext = useMemo(
    () => ({ workshops, isSearchMap, setIsSearchMap, valueSearch, setValueSearch }),
    [isSearchMap, valueSearch, workshops],
  );

  return (
    <ResponsiveLayoutProvider>
      <workshopsContext.Provider value={valueContext}>
        {children}
        <SheetSearch
          isOpen={isSearchMap}
          setIsOpen={setIsSearchMap}
          workshops={filterWorkshop}
          value={valueSearch}
          setValue={setValueSearch}
        />
      </workshopsContext.Provider>
    </ResponsiveLayoutProvider>
  );
};

import React, { FunctionComponent, useMemo, useState } from 'react';

// types
import { WorkshopsT } from './workshops.types';

// helps
import { searchTextInArray } from '../../helps/helps';
import { SheetSearch } from './components/SheetSearch/SheetSearch';

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
    longitude: 32.04073045402765,
    latitude: 49.435687070760046,
  },
  {
    id: 2,
    title: 'Test name 2',
    description:
      'test 2 description test description test description test description test description test description test description test description test description v test description',
    address: 'lane testing 2',
    rating: 4.1,
    longitude: 32.10822053253651,
    latitude: 49.40207074110663,
  },
];

export const workshopsContext = React.createContext({} as WorkshopsContext);

export const WorkshopsProvider: FunctionComponent<WorkshopsProviderProps> = ({ children }) => {
  const [workshops, setWorkshops] = useState<WorkshopsT>(DEFAULT_LIST);
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
  );
};

import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

export interface PheedMapContextType {
  pheedMapLocationInfo: string;
  pheedMapLocationAddInfo: string;
  pheedMapRegionCode: null | string;
  pheedMapRegionName: null | string;
  pheedMapLatitude: number;
  pheedMapLongitude: number;
  setPheedMapLocationInfo: Dispatch<SetStateAction<string>>;
  setPheedMapLocationAddInfo: Dispatch<SetStateAction<string>>;
  setPheedMapRegionCode: Dispatch<SetStateAction<string | null>>;
  setPheedMapRegionName: Dispatch<SetStateAction<string | null>>;
  setPheedMapLatitude: Dispatch<SetStateAction<number>>;
  setPheedMapLongitude: Dispatch<SetStateAction<number>>;
}

export const PheedMapContext = createContext<PheedMapContextType>({
  pheedMapLocationInfo: '',
  pheedMapLocationAddInfo: '',
  pheedMapRegionCode: null,
  pheedMapRegionName: '',
  pheedMapLatitude: 0,
  pheedMapLongitude: 0,
  setPheedMapLocationInfo: () => {},
  setPheedMapLocationAddInfo: () => {},
  setPheedMapRegionCode: () => {},
  setPheedMapRegionName: () => {},
  setPheedMapLatitude: () => {},
  setPheedMapLongitude: () => {},
});

export const PheedMapProvider = ({children}: {children: ReactNode}) => {
  const [pheedMapLocationInfo, setPheedMapLocationInfo] = useState<string>('');
  const [pheedMapLocationAddInfo, setPheedMapLocationAddInfo] =
    useState<string>('');
  const [pheedMapRegionCode, setPheedMapRegionCode] = useState<string | null>(
    null,
  );
  const [pheedMapRegionName, setPheedMapRegionName] = useState<string>('');
  const [pheedMapLatitude, setPheedMapLatitude] = useState<number>(0);
  const [pheedMapLongitude, setPheedMapLongitude] = useState<number>(0);

  const pheedMapValue = {
    pheedMapLocationInfo,
    pheedMapLocationAddInfo,
    pheedMapRegionCode,
    pheedMapRegionName,
    pheedMapLatitude,
    pheedMapLongitude,
    setPheedMapLocationInfo,
    setPheedMapLocationAddInfo,
    setPheedMapRegionCode,
    setPheedMapRegionName,
    setPheedMapLatitude,
    setPheedMapLongitude,
  };

  return (
    <PheedMapContext.Provider value={pheedMapValue}>
      {children}
    </PheedMapContext.Provider>
  );
};

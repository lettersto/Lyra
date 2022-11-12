import React, {
  createContext,
  useState,
  useMemo,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

export interface PheedContextType {
  locationInfo: null | string;
  pheedLatitude: null | number;
  pheedLongitude: null | number;
  setLocationInfo: Dispatch<SetStateAction<string | null>>;
  setPheedLatitude: Dispatch<SetStateAction<number | null>>;
  setPheedLongitude: Dispatch<SetStateAction<number | null>>;
}

export const PheedContext = createContext<PheedContextType>({
  locationInfo: null,
  pheedLatitude: null,
  pheedLongitude: null,
  setLocationInfo: () => {},
  setPheedLatitude: () => {},
  setPheedLongitude: () => {},
});

export const PheedProvider = ({children}: {children: ReactNode}) => {
  const [locationInfo, setLocationInfo] = useState<string | null>(null);
  const [pheedLatitude, setPheedLatitude] = useState<number | null>(null);
  const [pheedLongitude, setPheedLongitude] = useState<number | null>(null);

  const pheedValue = useMemo(() => {
    return {
      locationInfo,
      pheedLatitude,
      pheedLongitude,
      setLocationInfo,
      setPheedLatitude,
      setPheedLongitude,
    };
  }, []);

  return (
    <PheedContext.Provider value={pheedValue}>{children}</PheedContext.Provider>
  );
};

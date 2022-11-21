import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

export interface MapContextType {
  userLocationInfo: null | string;
  userRegionCode: null | string;
  userLatitude: number;
  userLongitude: number;
  mapLatitude: number;
  mapLongitude: number;
  mapZoomLv: number;
  pheeds: any[];
  pheedsCnt: number;
  setUserLocationInfo: Dispatch<SetStateAction<string | null>>;
  setUserRegionCode: Dispatch<SetStateAction<string | null>>;
  setUserLatitude: Dispatch<SetStateAction<number>>;
  setUserLongitude: Dispatch<SetStateAction<number>>;
  setMapLatitude: Dispatch<SetStateAction<number>>;
  setMapLongitude: Dispatch<SetStateAction<number>>;
  setMapZoomLv: Dispatch<SetStateAction<number>>;
  setPheeds: Dispatch<SetStateAction<any[]>>;
  setPheedsCnt: Dispatch<SetStateAction<number>>;
}

export const MapContext = createContext<MapContextType>({
  userLocationInfo: null,
  userRegionCode: null,
  userLatitude: 0,
  userLongitude: 0,
  mapLatitude: 0,
  mapLongitude: 0,
  mapZoomLv: 17,
  pheeds: [],
  pheedsCnt: 0,
  setUserLocationInfo: () => {},
  setUserRegionCode: () => {},
  setUserLatitude: () => {},
  setUserLongitude: () => {},
  setMapLatitude: () => {},
  setMapLongitude: () => {},
  setMapZoomLv: () => {},
  setPheeds: () => {},
  setPheedsCnt: () => {},
});

export const MapProvider = ({children}: {children: ReactNode}) => {
  const [userLocationInfo, setUserLocationInfo] = useState<string | null>(null);
  const [userRegionCode, setUserRegionCode] = useState<string | null>(null);
  const [userLatitude, setUserLatitude] = useState<number>(0);
  const [userLongitude, setUserLongitude] = useState<number>(0);
  const [mapLatitude, setMapLatitude] = useState<number>(0);
  const [mapLongitude, setMapLongitude] = useState<number>(0);
  const [mapZoomLv, setMapZoomLv] = useState<number>(17);
  const [pheeds, setPheeds] = useState<any[]>([]);
  const [pheedsCnt, setPheedsCnt] = useState<number>(0);

  const mapValue = {
    userLocationInfo,
    userRegionCode,
    userLatitude,
    userLongitude,
    mapLatitude,
    mapLongitude,
    mapZoomLv,
    pheeds,
    pheedsCnt,
    setUserLocationInfo,
    setUserRegionCode,
    setUserLatitude,
    setUserLongitude,
    setMapLatitude,
    setMapLongitude,
    setMapZoomLv,
    setPheeds,
    setPheedsCnt,
  };

  return <MapContext.Provider value={mapValue}>{children}</MapContext.Provider>;
};

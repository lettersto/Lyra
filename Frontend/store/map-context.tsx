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
  userLatitude: null | number;
  userLongitude: null | number;
  mapLatitude: number;
  mapLongitude: number;
  mapZoomLv: number;
  setUserLocationInfo: Dispatch<SetStateAction<string | null>>;
  setUserRegionCode: Dispatch<SetStateAction<string | null>>;
  setUserLatitude: Dispatch<SetStateAction<number | null>>;
  setUserLongitude: Dispatch<SetStateAction<number | null>>;
  setMapLatitude: Dispatch<SetStateAction<number>>;
  setMapLongitude: Dispatch<SetStateAction<number>>;
  setMapZoomLv: Dispatch<SetStateAction<number>>;
}

export const MapContext = createContext<MapContextType>({
  userLocationInfo: null,
  userRegionCode: null,
  userLatitude: null,
  userLongitude: null,
  mapLatitude: 0,
  mapLongitude: 0,
  mapZoomLv: 17,
  setUserLocationInfo: () => {},
  setUserRegionCode: () => {},
  setUserLatitude: () => {},
  setUserLongitude: () => {},
  setMapLatitude: () => {},
  setMapLongitude: () => {},
  setMapZoomLv: () => {},
});

export const MapProvider = ({children}: {children: ReactNode}) => {
  const [userLocationInfo, setUserLocationInfo] = useState<string | null>(null);
  const [userRegionCode, setUserRegionCode] = useState<string | null>(null);
  const [userLatitude, setUserLatitude] = useState<number | null>(null);
  const [userLongitude, setUserLongitude] = useState<number | null>(null);
  const [mapLatitude, setMapLatitude] = useState<number>(0);
  const [mapLongitude, setMapLongitude] = useState<number>(0);
  const [mapZoomLv, setMapZoomLv] = useState<number>(17);

  const mapValue = {
    userLocationInfo,
    userRegionCode,
    userLatitude,
    userLongitude,
    mapLatitude,
    mapLongitude,
    mapZoomLv,
    setUserLocationInfo,
    setUserRegionCode,
    setUserLatitude,
    setUserLongitude,
    setMapLatitude,
    setMapLongitude,
    setMapZoomLv,
  };

  return <MapContext.Provider value={mapValue}>{children}</MapContext.Provider>;
};

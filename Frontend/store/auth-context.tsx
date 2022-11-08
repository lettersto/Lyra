import React, {
  createContext,
  useState,
  useMemo,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
export interface authContextType {
  userId: null | number;
  nickname: null | string;
  imageURL: null | string;
  isLoggedIn: boolean;
  latitude: null | number;
  longitude: null | number;
  townName: null | string;
  setUserId: Dispatch<SetStateAction<number | null>>;
  setNickname: Dispatch<SetStateAction<string | null>>;
  setImageURL: Dispatch<SetStateAction<string | null>>;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setLatitude: Dispatch<SetStateAction<number | null>>;
  setLongitude: Dispatch<SetStateAction<number | null>>;
  setTownName: Dispatch<SetStateAction<string | null>>;
}

export const AuthContext = createContext<authContextType>({
  userId: null,
  nickname: null,
  imageURL: null,
  latitude: null,
  longitude: null,
  isLoggedIn: false,
  townName: null,
  setUserId: () => {},
  setNickname: () => {},
  setImageURL: () => {},
  setIsLoggedIn: () => {},
  setLatitude: () => {},
  setLongitude: () => {},
  setTownName: () => {},
});

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [townName, setTownName] = useState<string | null>(null);

  const authValue = useMemo(() => {
    return {
      userId,
      nickname,
      imageURL,
      isLoggedIn,
      latitude,
      longitude,
      townName,
      setUserId,
      setNickname,
      setImageURL,
      setIsLoggedIn,
      setLatitude,
      setLongitude,
      setTownName,
    };
  }, [userId, nickname, imageURL, isLoggedIn, latitude, longitude, townName]);

  // const authValue = {
  //   userId,
  //   nickname,
  //   imageURL,
  //   isLoggedIn,
  //   latitude,
  //   longitude,
  //   townName,
  //   setUserId,
  //   setNickname,
  //   setImageURL,
  //   setIsLoggedIn,
  //   setLatitude,
  //   setLongitude,
  // };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

// import React, {
//   createContext,
//   useState,
//   ReactNode,
//   Dispatch,
//   SetStateAction,
// } from 'react';

// export interface AuthValueType {
//   // accessToken: null | string;
//   // refreshToken: null | string;
//   isLoggedIn: null | boolean;
// }

// export interface authContextType {
//   authState: AuthValueType;
//   // getAccessToken: () => string | null;
//   setAuthState: Dispatch<SetStateAction<AuthValueType>>;
// }

// export const AuthContext = createContext<authContextType | null>(null);

// export const AuthProvider = ({children}: {children: ReactNode}) => {
//   const [authState, setAuthState] = useState<AuthValueType>({
//     // accessToken: null,
//     // refreshToken: null,
//     isLoggedIn: null,
//   });

//   // const getAccessToken = (): string | null => {
//   //   return authState.accessToken;
//   // };

//   const authValue = {
//     authState,
//     // getAccessToken,
//     setAuthState,
//   };

//   return (
//     <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
//   );
// };

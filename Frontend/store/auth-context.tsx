import {createContext, Dispatch, SetStateAction} from 'react';

// TODO It's just temporary implementation of auth state.
// should discuss how we will manage the client state.

interface AuthContextInterface {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextInterface>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export default AuthContext;

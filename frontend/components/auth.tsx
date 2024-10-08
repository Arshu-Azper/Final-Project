import { useContext, createContext, type PropsWithChildren } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: boolean | null;

}>({
  signIn: () => null,
  signOut: () => null,
  session: null,

});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const token = async AsyncStorage.getItem('token');

  const [ session, setSession] = useState(Boolean);
  if(!token){
    setSession(false); 
  }

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          // Perform sign-in logic here
          setSession(true);
        },
        signOut: () => {
          setSession(false);
        },
        session,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

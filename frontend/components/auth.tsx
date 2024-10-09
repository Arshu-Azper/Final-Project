import { useContext, createContext, type PropsWithChildren, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';


const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: boolean | null;
  loading?: boolean
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  loading: true,
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


function getInfo()
{
  const [token, setToken] = useState<string | null>();
  const [ session, setSession] = useState(Boolean);
  const [loading, setLoading] = useState(Boolean);

  useEffect( () => {
    async function getToken(){
       //const tokenResult = await AsyncStorage.getItem('token');
      const tokenResult = await 'temp';
      setToken(tokenResult)
      if(tokenResult != undefined)
      {
        setSession(true);
      }else
      {
        setSession(false);
      }
      setLoading(false);
    }
    getToken(); 
}, []);
  return session;
}

export function SessionProvider({ children }: PropsWithChildren) {
  // const token = getInfo();
  let session = getInfo();
  console.log(session)

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          // Perform sign-in logic here
          session = true;
        },
        signOut: () => {
          session = false;
        },
        session,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

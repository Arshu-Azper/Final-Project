import { useContext, createContext, type PropsWithChildren, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';


const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: boolean | null ;
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


function getSession()
{
  const [token, setToken] = useState<string | null>();
  const [ session, setSession] = useState< boolean | null >();
  //const [loading, setLoading] = useState(Boolean);

  useEffect( () => {
    async function getToken(){
      const tokenResult = await AsyncStorage.getItem('token');
      //const tokenResult = await 'temp';
      setToken(tokenResult)
      if(tokenResult == undefined || tokenResult == null)
      {
        setSession(false);
      }else
      {
        setSession(true);
      }

    }
    getToken(); 
}, []);
return {session, setSession}
}

export function SessionProvider({ children }: PropsWithChildren) {

  const {session, setSession} = getSession();
  console.log(session)

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          console.log(session)
          // Perform sign-in logic here
          setSession(true)
          console.log(session)
        },
        signOut: () => {
          setSession(false)
        },
        session,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

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

  useEffect( () => {
    async function getToken(){
      console.log('t')
      // const tokenResult = await AsyncStorage.getItem('token');
      const tokenResult = await 'temp';
      console.log(tokenResult)
      setToken(tokenResult)
    }
    console.log('I cry')
    getToken(); 
}, [setToken]);
console.log(token)
  return [token];
}

export function SessionProvider({ children }: PropsWithChildren) {
  const token = getInfo();
  console.log(getInfo())
  const [loading, setLoading] = useState(false);
  const [ session, setSession] = useState(false);


  if(!token){
    console.log("token:", token)
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
        loading
      }}>
      {children}
    </AuthContext.Provider>
  );
}

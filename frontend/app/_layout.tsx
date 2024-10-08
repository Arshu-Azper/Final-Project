import { Slot } from 'expo-router';
import { SessionProvider } from '../components/auth';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Root() {
 
  const [token, setToken] = useState<string | null>();

  useEffect( () => {
    async function getToken(){
      console.log('t')
      // const tokenResult = await AsyncStorage.getItem('token');
      const tokenResult = await 'temp';
      console.log('tokenResult')
      setToken(tokenResult)
    }
  }
)

  return (
    <SessionProvider>
        <Slot />
    </SessionProvider>
  );
}
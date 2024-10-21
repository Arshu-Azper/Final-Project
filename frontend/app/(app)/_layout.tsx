import { Redirect, Stack, router, Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, Button } from "react-native";
import { useState } from 'react';

import { useSession } from '../../components/auth';


export default function AppLayout() {
  const { session } = useSession();

  if (session == false) {
    return <Redirect href='../sign-in' />;
  }
  const [tester, setTester] = useState(true);
  // This layout can be deferred because it's not the root layout.
  return (
    
    <Stack screenOptions={{headerStyle:{
      backgroundColor: "#2196f3"
    },
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
    }}>
    <Stack.Screen name='index' 
      options={{ title:"Home", headerRight: () => (
        <Link href='/profile' asChild>
          <Pressable>
            <FontAwesome name="user-circle" size={24} color="white" />
          </Pressable>
        </Link>
        ) }} />
    <Stack.Screen name='profile' options={{title:'profile'}} />
  </Stack>
  )
}
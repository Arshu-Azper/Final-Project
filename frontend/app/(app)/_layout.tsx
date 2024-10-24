import { Redirect, Stack, router, Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable } from "react-native";
import UserIcon from '../../components/userIcon'

import { useSession } from '../../components/auth';


export default function AppLayout() {
  const { session } = useSession();

  if (session == false) {
    return <Redirect href='../sign-in' />;
  }

  return (
    
    <Stack screenOptions={{headerStyle:{
      backgroundColor: "#1e6091"
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
            <UserIcon colorBorder='white' containerSize={36}/>
          </Pressable>
        </Link>
        ) }} />
    <Stack.Screen name='profile' options={{title:'Profile'}} />
  </Stack>
  )
}
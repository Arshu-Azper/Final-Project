import { Redirect, Stack, router, Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable } from "react-native";

import { useSession } from '../../components/auth';

export default function AppLayout() {
  const { session } = useSession();
  
  if (session == false) {
    return <Redirect href='../sign-in' />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
  <Stack>
    <Stack.Screen name='index' options={{ title:"Home", headerRight: () => (<Link href="/profile" asChild><Pressable><FontAwesome name="user-circle-o" size={24} color="black" /></Pressable></Link>) }} />
    <Stack.Screen name='profile' options={{title:'profile'}} />
  </Stack>
  )
}
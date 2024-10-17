import { Redirect, Stack, router, Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable } from "react-native";
import { useState } from 'react';
import ProfileModal from '@/components/profileModal';

import { useSession } from '../../components/auth';

export default function AppLayout() {
  const { session } = useSession();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  if (session == false) {
    return <Redirect href='../sign-in' />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
  <Stack>
    <Stack.Screen name='index' 
      options={{ title:"Home", headerRight: () => (
        <><Pressable onPress={() => {setIsModalVisible(true)}}><FontAwesome name="user-circle-o" size={24} color="black" /></Pressable>
        <ProfileModal isVisible={isModalVisible}/></>
        ) }} />
    <Stack.Screen name='profile' options={{title:'profile'}} />
  </Stack>
  )
}
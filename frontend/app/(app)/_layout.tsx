import { Redirect, Stack, router, Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, Button } from "react-native";
import { useState } from 'react';
import ProfileModal from '@/components/profileModal';
import DropDown from "../../components/profileDropDown";

import { useSession } from '../../components/auth';
import{workAround} from '../../components/workAroundHook'

export default function AppLayout() {
  const {reload} = workAround();
  const { session } = useSession();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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
        <>
        {!reload && (<DropDown parentControll={tester}/>)}
        </>
        ) }} />
    <Stack.Screen name='profile' options={{title:'profile'}} />
  </Stack>
  )
}
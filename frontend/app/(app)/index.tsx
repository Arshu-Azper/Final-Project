import React from 'react';
import { SafeAreaView, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

import { useSession } from '../../components/auth';

export default function WelcomeScreen() {
    const { signOut, session } = useSession();
    
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    signOut();
    console.log('t')
    router.replace('../sign-in');
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Welcome!</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Console" onPress={() => {console.log(session)}} />
      <Button title="Console2" onPress={async() => {const tokenResult = await AsyncStorage.getItem('token'); console.log(tokenResult)}} />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
      },
      headerText: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
      },
});

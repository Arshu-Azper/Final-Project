import React from 'react';
import { SafeAreaView, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

import { useSession } from '../../components/auth';

export default function WelcomeScreen() {
    const { signOut } = useSession();
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/sign-in');
    signOut();
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Welcome!</Text>
      <Button title="Logout" onPress={handleLogout} />
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

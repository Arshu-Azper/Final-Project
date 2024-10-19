import React from "react";
import { SafeAreaView, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Test from "../../components/test";

import SelectDropdown from "react-native-select-dropdown";

import { useSession } from "../../components/auth";

export default function WelcomeScreen() {
  const { signOut, session } = useSession();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    signOut();
    console.log("t");
    router.replace("../sign-in");
  };

  const testingDebug = async () => {
    const url = "http://192.168.1.158:5000/users/test";
    const tokenResult = await AsyncStorage.getItem("token");
    const body = { token: tokenResult };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log('error', error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Welcome!</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Test" onPress={testingDebug} />
      <Test></Test>
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

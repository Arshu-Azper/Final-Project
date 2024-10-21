import React from "react";
import { SafeAreaView, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDown from "../../components/profileDropDown";

import { useSession } from "../../components/auth";

export default function WelcomeScreen() {
  const { signOut, session } = useSession();

  const testingDebug = async () => {
    const url = "http://192.168.1.158:5000/users/verify";
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
      
      if(result.error)
      {
        signOut()
      }
    } catch (error) {
      //console.log('error', error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Welcome!</Text>
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

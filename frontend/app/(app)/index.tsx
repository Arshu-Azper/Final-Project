import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet, Pressable, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Link } from 'expo-router';


import { useSession } from "../../components/auth";

export default function WelcomeScreen() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [displayMessage, setDisplayMessage] = useState('');

  //Pull Info from Local Storage
  useEffect(() => {
    async function getFromStorage() {
      try {
        const result = await AsyncStorage.getItem("loginType");
        const resultLastName = await AsyncStorage.getItem("lastName");
        const resultFirstName = await AsyncStorage.getItem("firstName");

        if (resultLastName != null) {
          setLastName(resultLastName)
        }
        if (resultFirstName != null) {
          setFirstName(resultFirstName)
        }
        if (result != null) {
          if (result == 'login') {
            setDisplayMessage('Welcome back,')

          }
        }
        else {
          throw new TypeError('Type is Null');
        }
      }
      catch (error) {
        console.log('Error')
      }
    }
    getFromStorage()
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>{displayMessage} {firstName} {lastName}.</Text>
      <Link href='/(app)/ar' asChild>
      <Pressable>
          <Text>Testing</Text>
      </Pressable>
      </Link>
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

//External Imports
import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet, Pressable, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';

//Internal Imports
import LogoutButton from "@/components/logoutButton";
import { ThemeColors } from "@/constants/Colors";


export default function WelcomeScreen() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [displayMessage, setDisplayMessage] = useState('');

  //const [characterList, setCharacterList] = useState()

  //Pull Info from Local Storage
  useFocusEffect(() => {
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
          else{
            setDisplayMessage('Welcome,')
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
  });

  return (
    <SafeAreaView>
      
      <View style={styles.subHeader}>
        {/* <Pressable>
          <View className="bg-white rounded-full py-0.5 px-2">
            <Text >Add Character</Text>
          </View>
        </Pressable> */}
      </View>
      
      <View style={styles.listContainer}>
        <Text style={styles.greetingText}>{displayMessage} {firstName} {lastName}.</Text>
        {/* {!characterList &&(
        <View className="flex items-center p-4 rounded bg-primary">
          <Text className="text-xl text-white">You have no characters</Text>
          <Pressable>
            <View className="px-4 py-2 mt-5 bg-white rounded">
              <Text className="font-bold">Add Character</Text>
            </View>
          </Pressable>
        </View>
        )} */}
        <LogoutButton/>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  subHeader: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 32,
    minHeight: 32,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: ThemeColors.primary,
    opacity: .75
  },
  listContainer: {
    alignItems: 'center'
  },
  greetingText:{
    padding: 10,
    fontSize: 24,
    lineHeight: 32,
  }
  
})

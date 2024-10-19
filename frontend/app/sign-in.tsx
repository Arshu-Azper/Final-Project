import {
  Text,
  TextInput,
  Button,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { useSession } from '../components/auth';


export default function HomeScreen() {
  //Inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //Other Variables
  const [message, setMessage] = useState('');
  const { signIn, session } = useSession();
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [loginHeader, setLoginHeader] = useState('Login');

  useEffect(() => {
    if (session == true) {
      // On web, static rendering will stop here as the user is not authenticated
      // in the headless Node process that the pages are rendered in.
      router.replace('/');
    }
  })

  const handlePress = async () => {
    if (isLoggingIn) {
      if (email === '' || password === '') {
        setMessage('Fill out fields');
        return;
      }
    } else {
      if (email === '' || password === '' || firstName === '' || lastName === '') {
        setMessage('Fill out fields');
        return;
      }
    }

    const url = isLoggingIn ? 'http://192.168.1.158:5000/users/login' : 'http://192.168.1.158:5000/users/register'; //will need to change ip to the ip of the device
    const body = isLoggingIn ? { username: email, password } : { username: email, password, firstName, lastName };
    console.log(body)
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(isLoggingIn ? 'Login Successful' : 'Registration Successful');
        if (result.token) {
          
          await AsyncStorage.setItem('token', result.token);
          console.log(result)
          signIn();
          router.replace('/');
        }
      } else {
        setMessage(result.message || 'Something went wrong.');
      }
    } catch (error) {
      setMessage('Error connecting to the server');
    }
  }

  const goToLogin = () => {
    setLoginHeader('Login');
    setIsLoggingIn(true);
  };
  const goToSignUp = () => {
    setLoginHeader('Sign Up');
    setIsLoggingIn(false);
  };

  const testSign = () => {
    signIn();
    router.replace('/');
  }
  return (
    <SafeAreaView style={styles.container}>

        <View style={styles.loginContainer}>
          <Text style={{ color: 'rgb(33, 150, 243)', fontSize: 60 }}>
            {loginHeader}
          </Text>

          {!isLoggingIn && (
            <View style={styles.name}>
              <TextInput
                style={styles.inputs}
                onChangeText={(text) => setFirstName(text)}
                value={firstName}
                autoCapitalize={'words'}
                placeholder="First Name"
              />

              <TextInput
                style={styles.inputs}
                onChangeText={(text) => setLastName(text)}
                value={lastName}
                autoCapitalize={'words'}
                placeholder="Last Name"
              />
            </View>
          )}

          <TextInput
            style={styles.inputs}
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize={'words'}
            placeholder="Enter Your Email"
          />

          <TextInput
            style={styles.inputs}
            onChangeText={(text) => setPassword(text)}
            value={password}
            autoCapitalize={'words'}
            placeholder="Enter Your Password"
          />

          <View style={styles.button}>
            <Button title="Confirm" onPress={handlePress} />
          </View>
          <Text>{message}</Text>

          {!isLoggingIn && (
            <>
              <Text>Already have an account?</Text>
              <Button title="Login" onPress={goToLogin} />
            </>
          )}
          {isLoggingIn && (
            <>
              <Text>Don't have an account?</Text>
              <Button title="Sign Up" onPress={goToSignUp} />
            </>
          )}
        </View>
  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'gray',
    padding: 8,
  },
  loginContainer: {
    gap: 10,
    padding: 25,
    margin: '5%',
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    borderRadius: 16,
  },
  name: {
    width: '100%',
    gap: 10,
    alignItems: 'center',
  },
  inputs: {
    height: 40,
    backgroundColor: 'white',
    borderColor: 'rgb(33, 150, 243)',
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    width: '70%',
  },
  button: {
    width: '80%',
  },
});
import {
    Text,
    TextInput,
    Button,
    SafeAreaView,
    StyleSheet,
    View,
  } from 'react-native';
  import React, { useState } from 'react';
  
  export default function HomeScreen() {
      //Inputs
      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      //Other Variables
      const [isLoggingIn, setIsLoggingIn] = useState(false);
      const [loggedIn, setLoggedIn] = useState(false);
      const [loginHeader, setLoginHeader] = useState('Sign Up');
    
      const [welcome, setWelcome] = useState('');
    
      const goToLogin = () => {
        setLoginHeader('Login');
        setIsLoggingIn(true);
      };
      const goToSignUp = () => {
        setLoginHeader('Sign Up');
        setIsLoggingIn(false);
      };
    
      const loggingIn = () => {
        setLoggedIn(true);
        if (isLoggingIn == false) {
          setWelcome(
            `Welcome ${firstName}, ${lastName}. Remember your login is your email (${email}) and password (${password})`
          );
        } else {
          setWelcome(`Logged in with email (${email}) and password (${password})`);
        }
      };
    return (
      <SafeAreaView style={styles.container}>
      {!loggedIn && (
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
            <Button title="Confirm" onPress={loggingIn} />
          </View>
  
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
      )}
      {loggedIn && (
        <View style={styles.loginContainer}>
          <Text style={{ color: 'rgb(33, 150, 243)', fontSize: 60 }}>
            Welcome{isLoggingIn && <Text> Back</Text>}
          </Text>
          <Text>{welcome}</Text>
        </View>
      )}
    </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'gray',
      padding: 8,
      margin: 10,
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
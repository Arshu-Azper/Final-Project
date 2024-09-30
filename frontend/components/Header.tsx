import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
    Text,
    TextInput,
    SafeAreaView,
    StyleSheet,
    View,
  } from 'react-native';

  export default function Header() {
    return (
        <View style={styles.container}>
            <Ionicons name="exit-outline" size={24} color="black" />
            <Text>Project Name</Text>
            <FontAwesome name="user-circle" size={24} color="black" />
        </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
        backgroundColor: "pink",
    },
  })
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet, TextInput } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSession } from "../../components/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

function getFirstName()
{
    const [firstName, setFirstName] = useState<string | null>();
    useEffect(()=>{
        async function getFromStorage()
        {
            const result = await AsyncStorage.getItem("firstName");
            setFirstName(result)
        }
        getFromStorage()
    })
    return {firstName, setFirstName}
}
function getLastName()
{
    const [lastName, setLastName] = useState<string | null>();
    useEffect(()=>{
        async function getFromStorage()
        {
            const result = await AsyncStorage.getItem("lastName");
            setLastName(result)
        }
        getFromStorage()
    })
    return {lastName, setLastName}
}

export default function Profile() {
    
    const { signOut, session } = useSession();
    const { firstName, setFirstName } = getFirstName();
    const {lastName, setLastName} = getLastName();
    

    
    return (
        <SafeAreaView style={styles.container}>
            <FontAwesome name="user-circle" size={122} color="Black" />
            <TextInput
            className="w-2/3 px-2 py-1 text-base text-center text-white rounded-2xl bg-secondary"
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
            autoCapitalize={"words"}/>
            <TextInput
            className="w-2/3 px-2 py-1 text-base text-center text-white rounded-2xl bg-secondary"
            onChangeText={(text) => setLastName(text)}
            value={lastName}
            autoCapitalize={"words"}/>
            <Pressable onPress={() => { signOut() }} className="p-4 mt-20 rounded-xl bg-primary">
                <View>
                    <Text className="text-3xl text-white">Logout</Text>
                </View>
            </Pressable>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        gap: 15,
    },
});
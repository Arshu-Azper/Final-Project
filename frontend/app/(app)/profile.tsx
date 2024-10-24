//External Imports
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Internal Imports
import { useSession } from "../../components/auth";
import UserIcon from '../../components/userIcon'
import ProfileModal from "@/components/profileModal";


export default function Profile() {
    //Auth Controll
    const { signOut, session } = useSession();
    const [modalVisible, setModalVisible] = useState(false);

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    //At first render
    useEffect(() => {
        async function getFromStorage() {
            const resultLastName = await AsyncStorage.getItem("lastName");
            const resultFirstName = await AsyncStorage.getItem("firstName");

            if (resultLastName != null) {
                setLastName(resultLastName)
            }
            if (resultFirstName != null) {
                setFirstName(resultFirstName)
            }
        }
        getFromStorage()
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            {/* User Icon Holder */}
            <View className="items-center p-5 border-8 rounded-full aspect-square border-secondary bg-secondary/25">
                <UserIcon containerSize={122} colorBorder="#168aad"/>
                <Text className="p-2 text-lg font-semibold text-center">{firstName}, {lastName}</Text>
            </View>
            
            {/* Action Buttons */}
            <Pressable onPress={() =>{setModalVisible(true)}} className="p-1 border-4 rounded-full border-secondary">
                <View>
                    <Text>Update Name</Text>
                </View>
            </Pressable>
            <Pressable onPress={() => { signOut() }} className="p-4 mt-20 rounded-xl bg-primary">
                <View>
                    <Text className="text-3xl text-white">Logout</Text>
                </View>
            </Pressable>

            <ProfileModal isVisible={modalVisible} firstNamePassed={firstName} lastNamePassed={lastName}/>
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
import { useEffect, useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


type propValue = {
    isVisible: boolean;
    firstNamePassed: string;
    lastNamePassed: string;
    close: () => void;
    updateVisibleName: (updatedFirstName: string, updatedLastName: string) => void
}

export default function ProfileModal(props: propValue) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    
    useEffect(()=>
    {
        setLastName(props.lastNamePassed)
        setFirstName(props.firstNamePassed)
        
    }, [props.isVisible])

 
    return (
        <Modal transparent visible={props.isVisible}>
            <View className="items-center justify-center flex-1 bg-gray-100/50">
                <View className="w-10/12 p-4 bg-white shadow-2xl rounded-2xl shadow-black">
                    <Text className='text-2xl font-bold text-center'>Update Name</Text>
                    <View className='items-center justify-center gap-2 p-4 m-3 align-baseline rounded-xl bg-primary/75'>
                        <TextInput
                            className='w-3/4 text-center bg-white rounded-full'
                            onChangeText={(text) => setFirstName(text)}
                            value={firstName}
                            autoCapitalize={"words"}
                       
                        />

                        <TextInput
                            className='w-3/4 text-center bg-white rounded-full'
                            onChangeText={(text) => setLastName(text)}
                            value={lastName}
                            autoCapitalize={"words"}
                           

                        />
                    </View>
                    <Pressable onPress={() => { console.log(props.lastNamePassed) }}>
                        <View>
                            <Text>Logout</Text>
                        </View>
                    </Pressable>
                    <View className='flex flex-row items-center justify-between'>
                        <Pressable onPress={() => {props.close() }} className="px-2 py-1 bg-white border-4 rounded-full border-primary left-2">
                            <View>
                                <Text>Cancel</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={() => { props.updateVisibleName(firstName, lastName),props.close() }} className="p-2 rounded-full bg-primary right-2">
                            <View>
                                <Text className='text-white '>Confirm</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>


        </Modal>
    )
}
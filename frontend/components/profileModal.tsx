import { useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TextInput } from 'react-native';

type propValue = {
    isVisible: boolean;
    firstNamePassed: string;
    lastNamePassed: string
}

export default function ProfileModal(props: propValue) {
    const [firstName, setFirstName] = useState(props.firstNamePassed)
    const [lastName, setLastName] = useState(props.lastNamePassed)

    return (
        <Modal transparent visible={props.isVisible}>
            <View className="items-center justify-center flex-1 bg-gray-100/50">
            <View className="w-10/12 p-2 bg-white shadow-2xl rounded-2xl shadow-black">
                <TextInput
                    onChangeText={(text) => setFirstName(text)}
                    value={firstName}
                    autoCapitalize={"words"}
                    // placeholder="First Name"
                />

                <TextInput
                    onChangeText={(text) => setLastName(text)}
                    value={lastName}
                    autoCapitalize={"words"}
                    placeholder="Last Name"
                />
            </View>
            </View>

        </Modal>
    )
}
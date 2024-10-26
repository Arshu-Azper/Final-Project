import { View, Pressable, Text} from 'react-native';
import { useSession } from "./auth";

export default function LogoutButton() {
    const { signOut, session } = useSession();
    return (
        <Pressable onPress={() => { signOut() }} className="p-4 mt-20 rounded-xl bg-primary">
            <View>
                <Text className="text-3xl text-white">Logout</Text>
            </View>
        </Pressable>
    )
}



import { SafeAreaView } from "react-native-safe-area-context"
import { Pressable, Text, View} from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSession } from "../../components/auth";

export default function Profile() {
    const { signOut, session } = useSession();

    return (
        <SafeAreaView>
            <FontAwesome name="user-circle" size={122} color="Black" />
            <Text>Profile</Text>

        <Pressable onPress={()=> {signOut()}}>
            <View>
                <Text>Logout</Text>
            </View>
        </Pressable>

        </SafeAreaView>
    )
}
import { View, StyleSheet, Image } from 'react-native';

type propValue = {
    containerSize: number;
    colorBorder: string;
}

export default function UserIcon(props: propValue) {
    return (
            <View className='border-2 rounded-full aspect-square' style={{borderColor: props.colorBorder}}>
                <Image source={{uri:'https://hips.hearstapps.com/hmg-prod/images/funny-pop-culture-cat-names-66aa693568e44.jpg?'}} style={{height: props.containerSize, width: props.containerSize}} className='rounded-full aspect-square'/>
            </View>
    )
}
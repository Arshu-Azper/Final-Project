import SelectDropdown from 'react-native-select-dropdown'
import { Link } from 'expo-router';
import {
    Text,
    StyleSheet,
    View,
    Pressable
  } from 'react-native';
  import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Test(){
  const emojisWithIcons = [
    {title: 'Theme' , backGround: '#ff6347'},
    {title: 'View Profile', backGround: '#fff'},
    {title: 'Logout', backGround: '#fff'},

  ];
return (
  <SelectDropdown
    data={emojisWithIcons}
    onSelect={(selectedItem, index) => {
      console.log(selectedItem, index);
    }}
    renderButton={() => {
      return (
        <View style={styles.dropdownButtonStyle}>
          <FontAwesome name="user-circle" size={24} color="black" />
        </View>
      );
    }}
    renderItem={() => {

      return (
      
        <View style={styles.dropdownItemStyle}>
          <Text style={{...styles.dropdownItemTxtStyle, backgroundColor: emojisWithIcons[0].backGround}}>{emojisWithIcons[0].title}</Text>
          <Link href="/profile" asChild>
        <Pressable>
        <View style={styles.dropdownItemStyle}>
          <Text style={{...styles.dropdownItemTxtStyle, backgroundColor: emojisWithIcons[1].backGround}}>{emojisWithIcons[0].title}</Text>
        </View>
        </Pressable>
        </Link>
        </View>
        
        
      );
    }}
    showsVerticalScrollIndicator={false}
    dropdownStyle={styles.dropdownMenuStyle}
  />

)
}


  const styles = StyleSheet.create({
    dropdownButtonStyle: {
      width: 200,
      height: 50,
      //backgroundColor: '#E9ECEF',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
      
    },
    dropdownButtonTxtStyle: {
      alignItems: 'center',
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
      textAlign: 'center'
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  });

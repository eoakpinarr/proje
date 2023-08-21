import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { COLORS } from '../Constant/Color'
import { FONTS } from '../Constant/Font'
import Ionicons from 'react-native-vector-icons/Ionicons'

const HomeHeader = () => {
    return (
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',
        padding:10,paddingHorizontal:15,backgroundColor:COLORS.white,elevation:2,paddingVertical:15}}>
            <Text style={styles.logo}>Chat</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Ionicons 
                 name="notifications"
                 style={{color:COLORS.theme,marginRight:7}}
                />
                <Avatar 
                  source={{uri: 'https://lh3.googleusercontent.com/a/AAcHTteenm-cx_KzsHCFgubQDJJnyOl1-FxWiP7A6cgxFeZ3SsU=s288-c-no'}} 
                  rounded
                  size="small" />
            </View>
        </View>
    )
}

export default HomeHeader;

const styles = StyleSheet.create({
    logo: {
        fontFamily: FONTS.Bold,
        color: COLORS.theme,
        fontSize: 22,
      },
})
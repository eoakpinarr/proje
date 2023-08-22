import { View, Text, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const LoginScreen = ({navigation}) => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <View>
        <Image
          tintColor={'black'}
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Threads_%28app%29_logo.svg/2048px-Threads_%28app%29_logo.svg.png' }}
          width={150} height={100} resizeMode="contain"
        />
      </View>
      <KeyboardAvoidingView className="items-center justify-center">
        <View>
          <Text className="font-semibold text-black text-base mt-5">Login To Your Account</Text>
        </View>
        <View className="mt-10">
          <View className="flex flex-row items-center gap-x-2 border-[#D0D0D0] border rounded-md">
            <MaterialIcons
              name='email'
              size={24}
              color={'gray'}
            />
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              className="mx-2.5 w-80 text-base"
              placeholder='enter your Email'
              placeholderTextColor={'gray'}
            />
          </View>

          <View className="flex flex-row items-center gap-x-2 border-[#D0D0D0] border rounded-md mt-2">
            <MaterialIcons
              name='lock'
              size={24}
              color={'gray'}
            />
            <TextInput
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
              className="mx-2.5 w-80 text-base"
              placeholder='enter your Password'
              placeholderTextColor={'gray'}
            />
          </View>

          <View className="flex flex-row items-center justify-between mt-3 ">
            <Text>Keep me logged in</Text>
            <Text className="font-medium text-[#007FFF]">Forgot Password</Text>
          </View>


        </View>
        <View className="mt-7">
          <Pressable className="bg-black p-4 mt-10 w-52 ml-auto mr-auto rounded-md">
            <Text className="text-center text-white font-bold text-base">Login</Text>
          </Pressable>

          <Pressable className="mt-4" onPress={() => navigation.navigate("Register")}>
            <Text className="text-center text-base">Don't have an account? Sign up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>


    </SafeAreaView>
  )
}

export default LoginScreen
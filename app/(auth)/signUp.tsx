import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const SignUp = () => {
  return (
    <View>
      <Redirect href="/(auth)/welcome" />
    </View>
  )
}

export default SignUp
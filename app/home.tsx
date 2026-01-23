import { View, Text, Button } from 'react-native'
import { SignedIn, SignedOut, useUser, useSession, useClerk } from "@clerk/clerk-expo";

import React from 'react'
import { Route } from 'expo-router/build/Route';
import { router } from 'expo-router';

const home = () => {
    const { user } = useUser();
      const { session } = useSession();
      const clerk = useClerk();

  return (
    <View>
      <Text>home</Text>
      <View></View>
        <Button
          title="Sign Out"
          onPress={async () => {
            await clerk.signOut();
            // console.log("Signed out" , session);
            router.replace("/(auth)/welcome");
          }}
        />
      </View>

  )
}

export default home

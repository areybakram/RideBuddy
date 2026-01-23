// import { Redirect } from "expo-router";
// import React from "react";
// import { View } from "react-native";

// const Home = () => {
//   return (
//       <Redirect href="/(auth)/welcome" />
//   );
// };

// export default Home;


import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { SignedIn, SignedOut, useUser, useSession, useClerk } from "@clerk/clerk-expo";
import { Link, Redirect } from "expo-router";

export default function Home() {
  const { user } = useUser();
  const { session } = useSession();
  const clerk = useClerk();

  console.log("Session task:", session?.currentTask);

  // Redirect to welcome page if no session
  if (!session) {
    return <Redirect href="/(auth)/welcome" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>

      {/* Show sign-in / sign-up links when signed out */}
      <SignedOut>
        <Link href="/(auth)/signIn">
          <Text style={styles.link}>Sign in</Text>
        </Link>
        <Link href="/(auth)/signUp">
          <Text style={styles.link}>Sign up</Text>
        </Link>
      </SignedOut>

      {/* Show user info and sign-out button when signed in */}
      <SignedIn>
        <Text style={styles.userText}>
          Hello {user?.emailAddresses[0].emailAddress}
        </Text>

        <Button
          title="Sign Out"
          onPress={async () => {
            await clerk.signOut();
          }}
        />
      </SignedIn>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  link: {
    fontSize: 16,
    color: "#0a7ea4",
    marginVertical: 4,
  },
  userText: {
    fontSize: 18,
    marginBottom: 12,
  },
});

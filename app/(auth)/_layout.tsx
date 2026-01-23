// import { Stack } from "expo-router";

// export const unstable_settings = {
//   anchor: "(tabs)",
// }; //optional added by app itself

// export default function Layout() {
//   return (

//   );
// }

import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/home"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="signUp" options={{ headerShown: false }} />
      <Stack.Screen name="signIn" options={{ headerShown: false }} />
    </Stack>
  );
}

import "../global.css";
import { Slot, Stack } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import {tokenCache} from "@clerk/clerk-expo/token-cache"
const PUBLISHABLE_KEY = "pk_test_ZGVjaWRpbmctcXVhaWwtMzIuY2xlcmsuYWNjb3VudHMuZGV2JA";

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} >
          <Slot/>
        </Stack>
      </SafeAreaView>
    </ClerkProvider>
  );
}
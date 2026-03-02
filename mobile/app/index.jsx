
import { SignOutButton } from "./components/SignOutButton";
import { SignedIn, SignedOut, useSession, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import {useTransactions} from "../hooks/useTransactions.js"
export default function Page() {
  const { user } = useUser();
  
  const API_URL="http://192.168.1.40:3000/api"
  console.log("user", user.id);
  const { session } = useSession();
  const {transactions, summary,isLoading, loadData, deleteTransaction} = useTransactions(user?.id);
  useEffect(()=>{
    loadData()
  },[loadData])
  console.log("userId=", typeof(user?.id));
  console.log("transactions", transactions)
  console.log("summary", summary);
  console.log(session?.currentTask);

  return (
    <View className="flex-1 bg-neutral-950 px-6 justify-center">
      
      {/* Header */}
      <View className="mb-10">
        <Text className="text-white text-3xl font-bold">
          Wallet App 💳
        </Text>
        <Text className="text-neutral-400 mt-2">
          Track your money smartly
        </Text>
      </View>

      {/* Card */}
      <View className="bg-neutral-900 rounded-2xl p-6 shadow-lg border border-neutral-800">
        
        <Text className="text-white text-xl font-semibold mb-4">
          Welcome!
        </Text>

        {/* Signed Out */}
        <SignedOut>
          <Link href="/(auth)/sign-in" asChild>
            <Pressable className="bg-red-600 py-3 rounded-xl mb-3 active:opacity-80">
              <Text className="text-white text-center font-semibold text-base">
                Sign In
              </Text>
            </Pressable>
          </Link>

          <Link href="/(auth)/sign-up" asChild>
            <Pressable className="border border-red-500 py-3 rounded-xl active:opacity-80">
              <Text className="text-red-500 text-center font-semibold text-base">
                Create Account
              </Text>
            </Pressable>
          </Link>
        </SignedOut>

        {/* Signed In */}
        <SignedIn>
          <Text className="text-neutral-300 mb-4">
            Logged in as
          </Text>

          <Text className="text-white text-lg font-semibold mb-6">
            {user?.emailAddresses[0].emailAddress}
          </Text>

          <SignOutButton />
        </SignedIn>
      </View>
    </View>
  );
}
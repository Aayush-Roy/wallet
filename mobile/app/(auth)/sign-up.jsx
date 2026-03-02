// import { useSignUp } from '@clerk/clerk-expo'
// import { Link, useRouter } from 'expo-router'
// import * as React from 'react'
// import { Pressable, StyleSheet, TextInput, Text, View } from 'react-native'

// export default function Page() {
//   const { isLoaded, signUp, setActive } = useSignUp()
//   const router = useRouter()

//   const [emailAddress, setEmailAddress] = React.useState('')
//   const [password, setPassword] = React.useState('')
//   const [pendingVerification, setPendingVerification] = React.useState(false)
//   const [code, setCode] = React.useState('')

//   // Handle submission of sign-up form
//   const onSignUpPress = async () => {
//     if (!isLoaded) return

//     // Start sign-up process using email and password provided
//     try {
//       await signUp.create({
//         emailAddress,
//         password,
//       })

//       // Send user an email with verification code
//       await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

//       // Set 'pendingVerification' to true to display second form
//       // and capture code
//       setPendingVerification(true)
//     } catch (err) {
//       // See https://clerk.com/docs/guides/development/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2))
//     }
//   }

//   // Handle submission of verification form
//   const onVerifyPress = async () => {
//     if (!isLoaded) return

//     try {
//       // Use the code the user provided to attempt verification
//       const signUpAttempt = await signUp.attemptEmailAddressVerification({
//         code,
//       })

//       // If verification was completed, set the session to active
//       // and redirect the user
//       if (signUpAttempt.status === 'complete') {
//         await setActive({
//           session: signUpAttempt.createdSessionId,
//           navigate: async ({ session }) => {
//             if (session?.currentTask) {
//               // Check for tasks and navigate to custom UI to help users resolve them
//               // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
//               console.log(session?.currentTask)
//               return
//             }

//             router.replace('/')
//           },
//         })
//       } else {
//         // If the status is not complete, check why. User may need to
//         // complete further steps.
//         console.error(JSON.stringify(signUpAttempt, null, 2))
//       }
//     } catch (err) {
//       // See https://clerk.com/docs/guides/development/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2))
//     }
//   }

//   if (pendingVerification) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>Verify your email</Text>
//         <Text style={styles.description}>
//           A verification code has been sent to your email.
//         </Text>
//         <TextInput
//           style={styles.input}
//           value={code}
//           placeholder="Enter your verification code"
//           placeholderTextColor="#666666"
//           onChangeText={(code) => setCode(code)}
//           keyboardType="numeric"
//         />
//         <Pressable
//           style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
//           onPress={onVerifyPress}
//         >
//           <Text style={styles.buttonText}>Verify</Text>
//         </Pressable>
//       </View>
//     )
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sign up</Text>
//       <Text style={styles.label}>Email address</Text>
//       <TextInput
//         style={styles.input}
//         autoCapitalize="none"
//         value={emailAddress}
//         placeholder="Enter email"
//         placeholderTextColor="#666666"
//         onChangeText={(email) => setEmailAddress(email)}
//         keyboardType="email-address"
//       />
//       <Text style={styles.label}>Password</Text>
//       <TextInput
//         style={styles.input}
//         value={password}
//         placeholder="Enter password"
//         placeholderTextColor="#666666"
//         secureTextEntry={true}
//         onChangeText={(password) => setPassword(password)}
//       />
//       <Pressable
//         style={({ pressed }) => [
//           styles.button,
//           (!emailAddress || !password) && styles.buttonDisabled,
//           pressed && styles.buttonPressed,
//         ]}
//         onPress={onSignUpPress}
//         disabled={!emailAddress || !password}
//       >
//         <Text style={styles.buttonText}>Continue</Text>
//       </Pressable>
//       <View style={styles.linkContainer}>
//         <Text>Have an account? </Text>
//         <Link href="/sign-in">
//           <Text style={styles.linkText}>Sign in</Text>
//         </Link>
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     gap: 12,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   description: {
//     fontSize: 14,
//     marginBottom: 16,
//     opacity: 0.8,
//   },
//   label: {
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     backgroundColor: '#fff',
//   },
//   button: {
//     backgroundColor: '#0a7ea4',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   buttonPressed: {
//     opacity: 0.7,
//   },
//   buttonDisabled: {
//     opacity: 0.5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   linkContainer: {
//     flexDirection: 'row',
//     gap: 4,
//     marginTop: 12,
//     alignItems: 'center',
//   },
//   linkText: {
//     color: '#0a7ea4',
//     fontWeight: '600',
//   },
// })
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import * as React from 'react'
import { Pressable, TextInput, Text, View, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return
    
    setIsLoading(true)
    setError('')

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err) {
      setError(err.errors?.[0]?.message || 'An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return
    
    setIsLoading(true)
    setError('')

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (signUpAttempt.status === 'complete') {
        await setActive({
          session: signUpAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask)
              return
            }
            router.replace('/')
          },
        })
      } else {
        setError('Verification failed. Please try again.')
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Invalid verification code.')
    } finally {
      setIsLoading(false)
    }
  }

  if (pendingVerification) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style="dark" />
        <View className="flex-1 px-6 justify-center">
          <View className="mb-8">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Verify your email
            </Text>
            <Text className="text-gray-600">
              We've sent a verification code to {emailAddress}
            </Text>
          </View>

          {error ? (
            <View className="bg-red-50 p-4 rounded-xl mb-4">
              <Text className="text-red-600 text-sm">{error}</Text>
            </View>
          ) : null}

          <View className="space-y-4">
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Verification Code
              </Text>
              <TextInput
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-base"
                value={code}
                placeholder="Enter 6-digit code"
                placeholderTextColor="#9CA3AF"
                onChangeText={(text) => {
                  setCode(text)
                  setError('')
                }}
                keyboardType="numeric"
                maxLength={6}
                editable={!isLoading}
              />
            </View>

            <Pressable
              className={`w-full py-3 rounded-xl items-center ${
                !code || isLoading 
                  ? 'bg-gray-200' 
                  : 'bg-blue-600 active:bg-blue-700'
              }`}
              onPress={onVerifyPress}
              disabled={!code || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="text-white font-semibold text-base">Verify Email</Text>
              )}
            </Pressable>

            <Pressable 
              className="items-center mt-4"
              onPress={() => {
                setPendingVerification(false)
                setCode('')
                setError('')
              }}
            >
              <Text className="text-blue-600 font-medium">Back to sign up</Text>
            </Pressable>

            <View className="items-center mt-2">
              <Text className="text-gray-500 text-sm">
                Didn't receive a code?{' '}
                <Text 
                  className="text-blue-600 font-medium"
                  onPress={onSignUpPress}
                >
                  Resend
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="flex-1 px-6 justify-center">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Create account
          </Text>
          <Text className="text-gray-600">
            Sign up to get started with our app
          </Text>
        </View>

        {/* Error Message */}
        {error ? (
          <View className="bg-red-50 p-4 rounded-xl mb-4">
            <Text className="text-red-600 text-sm">{error}</Text>
          </View>
        ) : null}

        {/* Form */}
        <View className="space-y-4">
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">
              Email Address
            </Text>
            <TextInput
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-base"
              autoCapitalize="none"
              autoCorrect={false}
              value={emailAddress}
              placeholder="you@example.com"
              placeholderTextColor="#9CA3AF"
              onChangeText={(text) => {
                setEmailAddress(text)
                setError('')
              }}
              keyboardType="email-address"
              editable={!isLoading}
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">
              Password
            </Text>
            <TextInput
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-base"
              value={password}
              placeholder="Create a password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text)
                setError('')
              }}
              editable={!isLoading}
            />
          </View>

          {/* Password Requirements */}
          <View className="mt-2">
            <Text className="text-xs text-gray-500">
              Password must contain at least 8 characters
            </Text>
          </View>

          <Pressable
            className={`w-full py-3 rounded-xl items-center mt-4 ${
              !emailAddress || !password || password.length < 8 || isLoading
                ? 'bg-gray-200'
                : 'bg-blue-600 active:bg-blue-700'
            }`}
            onPress={onSignUpPress}
            disabled={!emailAddress || !password || password.length < 8 || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white font-semibold text-base">Create Account</Text>
            )}
          </Pressable>
        </View>

        {/* Sign In Link */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-600">Already have an account? </Text>
          <Link href="/sign-in" asChild>
            <Pressable>
              <Text className="text-blue-600 font-semibold">Sign in</Text>
            </Pressable>
          </Link>
        </View>

        {/* Terms and Privacy */}
        <View className="mt-8">
          <Text className="text-xs text-gray-500 text-center">
            By signing up, you agree to our{' '}
            <Text className="text-blue-600">Terms of Service</Text>
            {' '}and{' '}
            <Text className="text-blue-600">Privacy Policy</Text>
          </Text>
        </View>

        {/* Optional: Social Sign Up */}
        <View className="mt-8">
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="mx-4 text-gray-400 text-sm">or sign up with</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          <View className="flex-row justify-center space-x-4">
            <Pressable className="w-12 h-12 bg-gray-50 rounded-full items-center justify-center border border-gray-200">
              <Text className="text-gray-600 text-xl">G</Text>
            </Pressable>
            <Pressable className="w-12 h-12 bg-gray-50 rounded-full items-center justify-center border border-gray-200">
              <Text className="text-gray-600 text-xl">A</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
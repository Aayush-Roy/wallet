
// import { useSignIn } from '@clerk/clerk-expo'
// import { Link, useRouter } from 'expo-router'
// import * as React from 'react'
// import { Pressable, StyleSheet, TextInput, View, Text } from 'react-native'

// export default function Page() {
//   const { signIn, setActive, isLoaded } = useSignIn()
//   const router = useRouter()

//   const [emailAddress, setEmailAddress] = React.useState('')
//   const [password, setPassword] = React.useState('')
//   const [code, setCode] = React.useState('')
//   const [showEmailCode, setShowEmailCode] = React.useState(false)

//   // Handle the submission of the sign-in form
//   const onSignInPress = React.useCallback(async () => {
//     if (!isLoaded) return

//     // Start the sign-in process using the email and password provided
//     try {
//       const signInAttempt = await signIn.create({
//         identifier: emailAddress,
//         password,
//       })

//       // If sign-in process is complete, set the created session as active
//       // and redirect the user
//       if (signInAttempt.status === 'complete') {
//         await setActive({
//           session: signInAttempt.createdSessionId,
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
//       } else if (signInAttempt.status === 'needs_second_factor') {
//         // Check if email_code is a valid second factor
//         // This is required when Client Trust is enabled and the user
//         // is signing in from a new device.
//         // See https://clerk.com/docs/guides/secure/client-trust
//         const emailCodeFactor = signInAttempt.supportedSecondFactors?.find(
//           (factor) => factor.strategy === 'email_code'
//         )
//         if (emailCodeFactor) {
//           await signIn.prepareSecondFactor({
//             strategy: 'email_code',
//             emailAddressId: emailCodeFactor.emailAddressId,
//           })
//           setShowEmailCode(true)
//         }
//       } else {
//         // If the status is not complete, check why. User may need to
//         // complete further steps.
//         console.error(JSON.stringify(signInAttempt, null, 2))
//       }
//     } catch (err) {
//       // See https://clerk.com/docs/guides/development/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2))
//     }
//   }, [isLoaded, signIn, setActive, router, emailAddress, password])

//   // Handle the submission of the email verification code
//   const onVerifyPress = React.useCallback(async () => {
//     if (!isLoaded) return

//     try {
//       const signInAttempt = await signIn.attemptSecondFactor({
//         strategy: 'email_code',
//         code,
//       })

//       if (signInAttempt.status === 'complete') {
//         await setActive({
//           session: signInAttempt.createdSessionId,
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
//         console.error(JSON.stringify(signInAttempt, null, 2))
//       }
//     } catch (err) {
//       console.error(JSON.stringify(err, null, 2))
//     }
//   }, [isLoaded, signIn, setActive, router, code])

//   // Display email code verification form
//   if (showEmailCode) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>Verify your email</Text>
//         <Text style={styles.description}>
//           A verification code has been sent to your email.
//         </Text>
//         <TextInput
//           style={styles.input}
//           value={code}
//           placeholder="Enter verification code"
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
//       <Text style={styles.title}>Sign in</Text>
//       <Text style={styles.label}>Email address</Text>
//       <TextInput
//         style={styles.input}
//         autoCapitalize="none"
//         value={emailAddress}
//         placeholder="Enter email"
//         placeholderTextColor="#666666"
//         onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
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
//         onPress={onSignInPress}
//         disabled={!emailAddress || !password}
//       >
//         <Text style={styles.buttonText}>Sign in</Text>
//       </Pressable>
//       <View style={styles.linkContainer}>
//         <Text>Don't have an account? </Text>
//         <Link href="/sign-up">
//           <Text style={styles.linkText}>Sign up</Text>
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
import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import * as React from 'react'
import { Pressable, TextInput, View, Text, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [code, setCode] = React.useState('')
  const [showEmailCode, setShowEmailCode] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return
    
    setIsLoading(true)
    setError('')

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({
          session: signInAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask)
              return
            }
            router.replace('/')
          },
        })
      } else if (signInAttempt.status === 'needs_second_factor') {
        const emailCodeFactor = signInAttempt.supportedSecondFactors?.find(
          (factor) => factor.strategy === 'email_code'
        )
        if (emailCodeFactor) {
          await signIn.prepareSecondFactor({
            strategy: 'email_code',
            emailAddressId: emailCodeFactor.emailAddressId,
          })
          setShowEmailCode(true)
        }
      } else {
        setError('Sign in failed. Please try again.')
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || 'An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [isLoaded, signIn, setActive, router, emailAddress, password])

  // Handle the submission of the email verification code
  const onVerifyPress = React.useCallback(async () => {
    if (!isLoaded) return
    
    setIsLoading(true)
    setError('')

    try {
      const signInAttempt = await signIn.attemptSecondFactor({
        strategy: 'email_code',
        code,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({
          session: signInAttempt.createdSessionId,
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
  }, [isLoaded, signIn, setActive, router, code])

  // Display email code verification form
  if (showEmailCode) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style="dark" />
        <View className="flex-1 px-6 justify-center">
          <View className="mb-8">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Verify your email
            </Text>
            <Text className="text-gray-600">
              We've sent a verification code to your email address.
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
                onChangeText={(code) => {
                  setCode(code)
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
                <Text className="text-white font-semibold text-base">Verify Code</Text>
              )}
            </Pressable>

            <Pressable 
              className="items-center mt-4"
              onPress={() => {
                setShowEmailCode(false)
                setCode('')
                setError('')
              }}
            >
              <Text className="text-blue-600 font-medium">Back to sign in</Text>
            </Pressable>
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
            Welcome back
          </Text>
          <Text className="text-gray-600">
            Sign in to continue to your account
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
              value={emailAddress}
              placeholder="you@example.com"
              placeholderTextColor="#9CA3AF"
              onChangeText={(emailAddress) => {
                setEmailAddress(emailAddress)
                setError('')
              }}
              keyboardType="email-address"
              editable={!isLoading}
            />
          </View>

          <View>
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-sm font-medium text-gray-700">Password</Text>
              <Link href="/forgot-password">
                <Text className="text-sm text-blue-600 font-medium">Forgot?</Text>
              </Link>
            </View>
            <TextInput
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-base"
              value={password}
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={true}
              onChangeText={(password) => {
                setPassword(password)
                setError('')
              }}
              editable={!isLoading}
            />
          </View>

          <Pressable
            className={`w-full py-3 rounded-xl items-center mt-4 ${
              !emailAddress || !password || isLoading
                ? 'bg-gray-200'
                : 'bg-blue-600 active:bg-blue-700'
            }`}
            onPress={onSignInPress}
            disabled={!emailAddress || !password || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white font-semibold text-base">Sign In</Text>
            )}
          </Pressable>
        </View>

        {/* Sign Up Link */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-600">Don't have an account? </Text>
          <Link href="/sign-up" asChild>
            <Pressable>
              <Text className="text-blue-600 font-semibold">Sign up</Text>
            </Pressable>
          </Link>
        </View>

        {/* Optional: Social Sign In */}
        <View className="mt-8">
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="mx-4 text-gray-400 text-sm">or continue with</Text>
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
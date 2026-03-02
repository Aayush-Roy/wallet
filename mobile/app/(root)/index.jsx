import { SignOutButton } from '../components/SignOutButton'
import { SignedIn, SignedOut, useSession, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { StyleSheet, View, Text } from 'react-native'

export default function Page() {
  const { user } = useUser()

  // If your user isn't appearing as signed in,
  // it's possible they have session tasks to complete.
  // Learn more: https://clerk.com/docs/guides/configure/session-tasks
  const { session } = useSession()
  console.log(session?.currentTask)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!!</Text>
      {/* Show the sign-in and sign-up buttons when the user is signed out */}
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text style={styles.linkText}>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text style={styles.linkText}>Sign up</Text>
        </Link>
      </SignedOut>
      {/* Show the sign-out button when the user is signed in */}
      <SignedIn>
        <Text style={styles.userEmail}>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
      </SignedIn>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 8,
  },
  linkText: {
    color: '#0a7ea4',
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 4,
  },
})
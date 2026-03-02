
// // import { SignOutButton } from "./components/SignOutButton";
// // import { SignedIn, SignedOut, useSession, useUser } from "@clerk/clerk-expo";
// // import { Link } from "expo-router";
// // import { useEffect } from "react";
// // import { View, Text, Pressable } from "react-native";
// // import {useTransactions} from "../hooks/useTransactions.js"
// // export default function Page() {
// //   const { user } = useUser();

// //   console.log("user", user?.id);
// //   const { session } = useSession();
// //   const {transactions,balance, summary,isLoading, loadData, deleteTransaction} = useTransactions(user?.id);

// //   useEffect(()=>{
// //     loadData()
// //   },[loadData])


// //   return (
// //     <View className="flex-1 bg-neutral-950 px-6 justify-center">
      
// //       {/* Header */}
// //       <View className="mb-10">
// //         <Text className="text-white text-3xl font-bold">
// //           Wallet App 💳
// //         </Text>
// //         <Text className="text-neutral-400 mt-2">
// //           Track your money smartly
// //         </Text>
// //       </View>

// //       {/* Card */}
// //       <View className="bg-neutral-900 rounded-2xl p-6 shadow-lg border border-neutral-800">
        
// //         <Text className="text-white text-xl font-semibold mb-4">
// //           Welcome!
// //         </Text>

// //         {/* Signed Out */}
// //         <SignedOut>
// //           <Link href="/(auth)/sign-in" asChild>
// //             <Pressable className="bg-red-600 py-3 rounded-xl mb-3 active:opacity-80">
// //               <Text className="text-white text-center font-semibold text-base">
// //                 Sign In
// //               </Text>
// //             </Pressable>
// //           </Link>

// //           <Link href="/(auth)/sign-up" asChild>
// //             <Pressable className="border border-red-500 py-3 rounded-xl active:opacity-80">
// //               <Text className="text-red-500 text-center font-semibold text-base">
// //                 Create Account
// //               </Text>
// //             </Pressable>
// //           </Link>
// //         </SignedOut>

// //         {/* Signed In */}
// //         <SignedIn>
// //           <Text className="text-neutral-300 mb-4">
// //             Logged in as
// //           </Text>

// //           <Text className="text-white text-lg font-semibold mb-6">
// //             {user?.emailAddresses[0].emailAddress}
// //           </Text>
// //           <View className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800 mt-6">

// //   <Text className="text-neutral-400 mb-2">
// //     Current Balance
// //   </Text>

// //   <Text className="text-white text-3xl font-bold mb-6">
// //     ₹ {summary.balance}
// //   </Text>

// //   {/* income + expense row */}
// //   <View className="flex-row justify-between">

// //     <View>
// //       <Text className="text-neutral-400 text-sm">Income</Text>
// //       <Text className="text-green-400 text-lg font-semibold">
// //         + ₹ {summary.income}
// //       </Text>
// //     </View>

// //     <View>
// //       <Text className="text-neutral-400 text-sm">Expenses</Text>
// //       <Text className="text-red-400 text-lg font-semibold">
// //         - ₹ {summary.expenses}
// //       </Text>
// //     </View>

// //   </View>

// // </View>
// //           <SignOutButton />
// //         </SignedIn>
// //       </View>
// //     </View>
// //   );
// // }

// import { SignOutButton } from "./components/SignOutButton";
// import { SignedIn, SignedOut, useSession, useUser } from "@clerk/clerk-expo";
// import { Link } from "expo-router";
// import { useEffect, useState } from "react";
// import { View, Text, Pressable, ScrollView, ActivityIndicator, TextInput, Alert, Modal } from "react-native";
// import { useTransactions } from "../hooks/useTransactions.js";

// export default function Page() {
//   const { user } = useUser();
//   const { session } = useSession();
//   const { transactions, summary, isLoading, loadData, deleteTransaction, createTransaction } = useTransactions(user?.id);
  
//   // Modal state
//   const [modalVisible, setModalVisible] = useState(false);
  
//   // Form state
//   const [title, setTitle] = useState("");
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("");
//   const [type, setType] = useState("expense");
//   const [isCreating, setIsCreating] = useState(false);

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   const categories = ["Food", "Transport", "Shopping", "Entertainment", "Bills", "Salary", "Other"];

//   const handleCreateTransaction = async () => {
//     if (!title || !amount || !category) {
//       Alert.alert("Error", "Please fill all fields");
//       return;
//     }

//     const numericAmount = parseFloat(amount);
//     if (isNaN(numericAmount) || numericAmount <= 0) {
//       Alert.alert("Error", "Please enter a valid amount");
//       return;
//     }

//     const finalAmount = type === "expense" ? -numericAmount : numericAmount;

//     setIsCreating(true);
//     try {
//       await createTransaction({
//         title,
//         amount: finalAmount,
//         category,
//         user_id: user?.id
//       });
      
//       Alert.alert("Success", "Transaction created successfully");
//       setModalVisible(false);
      
//       // Reset form
//       setTitle("");
//       setAmount("");
//       setCategory("");
//       setType("expense");
//     } catch (error) {
//       Alert.alert("Error", "Failed to create transaction");
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   const handleDelete = (id) => {
//     Alert.alert(
//       "Delete Transaction",
//       "Are you sure you want to delete this transaction?",
//       [
//         { text: "Cancel", style: "cancel" },
//         { 
//           text: "Delete", 
//           onPress: () => deleteTransaction(id),
//           style: "destructive"
//         }
//       ]
//     );
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
//   };

//   // Transaction Item Component
//   const TransactionItem = ({ item }) => {
//     const isIncome = item.amount > 0;
    
//     return (
//       <View style={{ 
//         backgroundColor: '#262626', 
//         borderRadius: 12, 
//         padding: 16, 
//         marginBottom: 12,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center'
//       }}>
//         <View style={{ flex: 1 }}>
//           <Text style={{ color: 'white', fontSize: 16, fontWeight: '600', marginBottom: 4 }}>
//             {item.title}
//           </Text>
          
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Text style={{ color: '#a3a3a3', fontSize: 12, marginRight: 12 }}>
//               {item.category}
//             </Text>
//             {item.created_at && (
//               <Text style={{ color: '#737373', fontSize: 12 }}>
//                 {formatDate(item.created_at)}
//               </Text>
//             )}
//           </View>
//         </View>

//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <Text style={{ 
//             fontSize: 18, 
//             fontWeight: 'bold', 
//             marginRight: 16,
//             color: isIncome ? '#4ade80' : '#f87171'
//           }}>
//             {isIncome ? '+' : '-'} ₹ {Math.abs(item.amount)}
//           </Text>

//           <Pressable 
//             onPress={() => handleDelete(item.id)}
//             style={{ backgroundColor: '#7f1d1d', padding: 8, borderRadius: 8 }}
//           >
//             <Text style={{ color: '#f87171', fontSize: 12 }}>Delete</Text>
//           </Pressable>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <ScrollView style={{ flex: 1, backgroundColor: '#0a0a0a', paddingHorizontal: 24, paddingVertical: 24 }}>
//       <View style={{ flex: 1 }}>
//         {/* Header */}
//         <View style={{ marginBottom: 32 }}>
//           <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>
//             Wallet App 💳
//           </Text>
//           <Text style={{ color: '#a3a3a3', marginTop: 8 }}>
//             Track your money smartly
//           </Text>
//         </View>

//         {/* Card */}
//         <View style={{ 
//           backgroundColor: '#171717', 
//           borderRadius: 16, 
//           padding: 24,
//           borderWidth: 1,
//           borderColor: '#262626',
//           marginBottom: 24
//         }}>
//           <Text style={{ color: 'white', fontSize: 20, fontWeight: '600', marginBottom: 16 }}>
//             Welcome!
//           </Text>

//           {/* Signed Out */}
//           <SignedOut>
//             <Link href="/(auth)/sign-in" asChild>
//               <Pressable style={{ 
//                 backgroundColor: '#dc2626', 
//                 paddingVertical: 12, 
//                 borderRadius: 12, 
//                 marginBottom: 12
//               }}>
//                 <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>
//                   Sign In
//                 </Text>
//               </Pressable>
//             </Link>

//             <Link href="/(auth)/sign-up" asChild>
//               <Pressable style={{ 
//                 borderWidth: 1, 
//                 borderColor: '#dc2626', 
//                 paddingVertical: 12, 
//                 borderRadius: 12 
//               }}>
//                 <Text style={{ color: '#dc2626', textAlign: 'center', fontWeight: '600' }}>
//                   Create Account
//                 </Text>
//               </Pressable>
//             </Link>
//           </SignedOut>

//           {/* Signed In */}
//           <SignedIn>
//             <Text style={{ color: '#a3a3a3', marginBottom: 16 }}>
//               Logged in as
//             </Text>

//             <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', marginBottom: 24 }}>
//               {user?.emailAddresses[0].emailAddress}
//             </Text>

//             {/* Balance Card */}
//             <View style={{ 
//               backgroundColor: '#262626', 
//               borderRadius: 16, 
//               padding: 24,
//               borderWidth: 1,
//               borderColor: '#404040',
//               marginBottom: 24
//             }}>
//               <Text style={{ color: '#a3a3a3', marginBottom: 8 }}>
//                 Current Balance
//               </Text>

//               <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', marginBottom: 24 }}>
//                 ₹ {summary?.balance || 0}
//               </Text>

//               {/* income + expense row */}
//               <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//                 <View>
//                   <Text style={{ color: '#a3a3a3', fontSize: 14 }}>Income</Text>
//                   <Text style={{ color: '#4ade80', fontSize: 18, fontWeight: '600' }}>
//                     + ₹ {summary?.income || 0}
//                   </Text>
//                 </View>

//                 <View>
//                   <Text style={{ color: '#a3a3a3', fontSize: 14 }}>Expenses</Text>
//                   <Text style={{ color: '#f87171', fontSize: 18, fontWeight: '600' }}>
//                     - ₹ {Math.abs(summary?.expenses || 0)}
//                   </Text>
//                 </View>
//               </View>
//             </View>

//             {/* Create Transaction Button */}
//             <Pressable 
//               onPress={() => setModalVisible(true)}
//               style={{ 
//                 backgroundColor: '#16a34a', 
//                 paddingVertical: 16, 
//                 borderRadius: 12, 
//                 marginBottom: 24 
//               }}
//             >
//               <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>
//                 + Create New Transaction
//               </Text>
//             </Pressable>

//             {/* Transactions List */}
//             <View style={{ marginBottom: 24 }}>
//               <Text style={{ color: 'white', fontSize: 20, fontWeight: '600', marginBottom: 16 }}>
//                 Recent Transactions
//               </Text>

//               {isLoading ? (
//                 <View style={{ paddingVertical: 32, alignItems: 'center' }}>
//                   <ActivityIndicator size="large" color="#dc2626" />
//                 </View>
//               ) : transactions?.length > 0 ? (
//                 transactions.map((transaction) => (
//                   <TransactionItem key={transaction.id} item={transaction} />
//                 ))
//               ) : (
//                 <View style={{ 
//                   backgroundColor: '#262626', 
//                   borderRadius: 12, 
//                   padding: 24, 
//                   alignItems: 'center' 
//                 }}>
//                   <Text style={{ color: '#a3a3a3', textAlign: 'center' }}>
//                     No transactions yet. Create your first transaction!
//                   </Text>
//                 </View>
//               )}
//             </View>

//             <SignOutButton />
//           </SignedIn>
//         </View>
//       </View>

//       {/* Create Transaction Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={{ 
//           flex: 1, 
//           backgroundColor: 'rgba(0,0,0,0.5)',
//           justifyContent: 'flex-end'
//         }}>
//           <View style={{ 
//             backgroundColor: '#171717',
//             borderTopLeftRadius: 24,
//             borderTopRightRadius: 24,
//             padding: 24,
//             minHeight: '80%'
//           }}>
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
//               <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
//                 New Transaction
//               </Text>
//               <Pressable onPress={() => setModalVisible(false)}>
//                 <Text style={{ color: '#dc2626', fontSize: 18 }}>Close</Text>
//               </Pressable>
//             </View>

//             {/* Transaction Type Toggle */}
//             <View style={{ 
//               flexDirection: 'row', 
//               marginBottom: 24, 
//               backgroundColor: '#262626', 
//               borderRadius: 12, 
//               padding: 4 
//             }}>
//               <Pressable
//                 onPress={() => setType("expense")}
//                 style={{ 
//                   flex: 1, 
//                   paddingVertical: 12, 
//                   borderRadius: 8,
//                   backgroundColor: type === "expense" ? '#dc2626' : 'transparent'
//                 }}
//               >
//                 <Text style={{ 
//                   textAlign: 'center', 
//                   fontWeight: '600',
//                   color: type === "expense" ? 'white' : '#a3a3a3'
//                 }}>
//                   Expense
//                 </Text>
//               </Pressable>

//               <Pressable
//                 onPress={() => setType("income")}
//                 style={{ 
//                   flex: 1, 
//                   paddingVertical: 12, 
//                   borderRadius: 8,
//                   backgroundColor: type === "income" ? '#16a34a' : 'transparent'
//                 }}
//               >
//                 <Text style={{ 
//                   textAlign: 'center', 
//                   fontWeight: '600',
//                   color: type === "income" ? 'white' : '#a3a3a3'
//                 }}>
//                   Income
//                 </Text>
//               </Pressable>
//             </View>

//             {/* Title Input */}
//             <View style={{ marginBottom: 16 }}>
//               <Text style={{ color: '#a3a3a3', marginBottom: 8 }}>Title</Text>
//               <TextInput
//                 style={{ 
//                   backgroundColor: '#262626', 
//                   color: 'white', 
//                   padding: 16, 
//                   borderRadius: 12,
//                   borderWidth: 1,
//                   borderColor: '#404040'
//                 }}
//                 placeholder="e.g., Grocery shopping"
//                 placeholderTextColor="#666"
//                 value={title}
//                 onChangeText={setTitle}
//               />
//             </View>

//             {/* Amount Input */}
//             <View style={{ marginBottom: 16 }}>
//               <Text style={{ color: '#a3a3a3', marginBottom: 8 }}>Amount (₹)</Text>
//               <TextInput
//                 style={{ 
//                   backgroundColor: '#262626', 
//                   color: 'white', 
//                   padding: 16, 
//                   borderRadius: 12,
//                   borderWidth: 1,
//                   borderColor: '#404040'
//                 }}
//                 placeholder="0.00"
//                 placeholderTextColor="#666"
//                 keyboardType="numeric"
//                 value={amount}
//                 onChangeText={setAmount}
//               />
//             </View>

//             {/* Category Selection */}
//             <View style={{ marginBottom: 24 }}>
//               <Text style={{ color: '#a3a3a3', marginBottom: 8 }}>Category</Text>
//               <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
//                 {categories.map((cat) => (
//                   <Pressable
//                     key={cat}
//                     onPress={() => setCategory(cat)}
//                     style={{ 
//                       marginRight: 8, 
//                       marginBottom: 8, 
//                       paddingHorizontal: 16, 
//                       paddingVertical: 8, 
//                       borderRadius: 20, 
//                       borderWidth: 1,
//                       borderColor: category === cat ? (type === "expense" ? '#dc2626' : '#16a34a') : '#404040',
//                       backgroundColor: category === cat ? (type === "expense" ? '#dc2626' : '#16a34a') : 'transparent'
//                     }}
//                   >
//                     <Text style={{ 
//                       color: category === cat ? 'white' : '#a3a3a3'
//                     }}>
//                       {cat}
//                     </Text>
//                   </Pressable>
//                 ))}
//               </View>
//             </View>

//             {/* Submit Button */}
//             <Pressable
//               onPress={handleCreateTransaction}
//               disabled={isCreating}
//               style={{ 
//                 paddingVertical: 16, 
//                 borderRadius: 12,
//                 backgroundColor: isCreating ? '#404040' : (type === "expense" ? '#dc2626' : '#16a34a')
//               }}
//             >
//               <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>
//                 {isCreating ? "Creating..." : "Create Transaction"}
//               </Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// }
import { SignOutButton } from "./components/SignOutButton";
import { SignedIn, SignedOut, useSession, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, ActivityIndicator, TextInput, Alert, Modal } from "react-native";
import { useTransactions } from "../hooks/useTransactions.js";

export default function Page() {
  const { user } = useUser();
  const { session } = useSession();
  const { transactions, summary, isLoading, loadData, deleteTransaction, createTransaction } = useTransactions(user?.id);
  
  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadData();
    }
  }, [user?.id]);

  const categories = ["Food", "Transport", "Shopping", "Entertainment", "Bills", "Salary", "Other"];

  const handleCreateTransaction = async () => {
    if (!title || !amount || !category) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    const finalAmount = type === "expense" ? -numericAmount : numericAmount;

    setIsCreating(true);
    try {
      await createTransaction({
        title,
        amount: finalAmount,
        category,
        user_id: user?.id
      });
      
      Alert.alert("Success", "Transaction created successfully");
      setModalVisible(false);
      
      // Reset form
      setTitle("");
      setAmount("");
      setCategory("");
      setType("expense");
    } catch (error) {
      Alert.alert("Error", "Failed to create transaction",error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          onPress: () => deleteTransaction(id),
          style: "destructive"
        }
      ]
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // Transaction Item Component
  const TransactionItem = ({ item }) => {
    const isIncome = item.amount > 0;
    
    return (
      <View style={{ 
        backgroundColor: '#262626', 
        borderRadius: 12, 
        padding: 16, 
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600', marginBottom: 4 }}>
            {item.title}
          </Text>
          
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#a3a3a3', fontSize: 12, marginRight: 12 }}>
              {item.category}
            </Text>
            {item.created_at && (
              <Text style={{ color: '#737373', fontSize: 12 }}>
                {formatDate(item.created_at)}
              </Text>
            )}
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: 'bold', 
            marginRight: 16,
            color: isIncome ? '#4ade80' : '#f87171'
          }}>
            {isIncome ? '+' : '-'} ₹ {Math.abs(item.amount)}
          </Text>

          <Pressable 
            onPress={() => handleDelete(item.id)}
            style={{ backgroundColor: '#7f1d1d', padding: 8, borderRadius: 8 }}
          >
            <Text style={{ color: '#f87171', fontSize: 12 }}>Delete</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0a0a0a' }}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 24 }}>
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View style={{ marginBottom: 32 }}>
            <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>
              Wallet App 💳
            </Text>
            <Text style={{ color: '#a3a3a3', marginTop: 8 }}>
              Track your money smartly
            </Text>
          </View>

          {/* Card */}
          <View style={{ 
            backgroundColor: '#171717', 
            borderRadius: 16, 
            padding: 24,
            borderWidth: 1,
            borderColor: '#262626',
            marginBottom: 24
          }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '600', marginBottom: 16 }}>
              Welcome!
            </Text>

            {/* Signed Out */}
            <SignedOut>
              <Link href="/(auth)/sign-in" asChild>
                <Pressable style={{ 
                  backgroundColor: '#dc2626', 
                  paddingVertical: 12, 
                  borderRadius: 12, 
                  marginBottom: 12
                }}>
                  <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>
                    Sign In
                  </Text>
                </Pressable>
              </Link>

              <Link href="/(auth)/sign-up" asChild>
                <Pressable style={{ 
                  borderWidth: 1, 
                  borderColor: '#dc2626', 
                  paddingVertical: 12, 
                  borderRadius: 12 
                }}>
                  <Text style={{ color: '#dc2626', textAlign: 'center', fontWeight: '600' }}>
                    Create Account
                  </Text>
                </Pressable>
              </Link>
            </SignedOut>

            {/* Signed In */}
            <SignedIn>
              <Text style={{ color: '#a3a3a3', marginBottom: 16 }}>
                Logged in as
              </Text>

              <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', marginBottom: 24 }}>
                {user?.emailAddresses[0].emailAddress}
              </Text>

              {/* Balance Card */}
              <View style={{ 
                backgroundColor: '#262626', 
                borderRadius: 16, 
                padding: 24,
                borderWidth: 1,
                borderColor: '#404040',
                marginBottom: 24
              }}>
                <Text style={{ color: '#a3a3a3', marginBottom: 8 }}>
                  Current Balance
                </Text>

                <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', marginBottom: 24 }}>
                  ₹ {summary?.balance || 0}
                </Text>

                {/* income + expense row */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View>
                    <Text style={{ color: '#a3a3a3', fontSize: 14 }}>Income</Text>
                    <Text style={{ color: '#4ade80', fontSize: 18, fontWeight: '600' }}>
                      + ₹ {summary?.income || 0}
                    </Text>
                  </View>

                  <View>
                    <Text style={{ color: '#a3a3a3', fontSize: 14 }}>Expenses</Text>
                    <Text style={{ color: '#f87171', fontSize: 18, fontWeight: '600' }}>
                      - ₹ {Math.abs(summary?.expenses || 0)}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Create Transaction Button - Direct Pressable with onPress */}
              <Pressable 
                onPress={() => {
                  console.log("Create button pressed");
                  setModalVisible(true);
                }}
                style={({ pressed }) => ({
                  backgroundColor: pressed ? '#15803d' : '#16a34a',
                  paddingVertical: 16,
                  borderRadius: 12,
                  marginBottom: 24,
                  opacity: pressed ? 0.9 : 1,
                })}
              >
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600', fontSize: 16 }}>
                  + Create New Transaction
                </Text>
              </Pressable>

              {/* Transactions List */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: '600', marginBottom: 16 }}>
                  Recent Transactions
                </Text>

                {isLoading ? (
                  <View style={{ paddingVertical: 32, alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#dc2626" />
                  </View>
                ) : transactions?.length > 0 ? (
                  transactions.map((transaction) => (
                    <TransactionItem key={transaction.id} item={transaction} />
                  ))
                ) : (
                  <View style={{ 
                    backgroundColor: '#262626', 
                    borderRadius: 12, 
                    padding: 24, 
                    alignItems: 'center' 
                  }}>
                    <Text style={{ color: '#a3a3a3', textAlign: 'center' }}>
                      No transactions yet. Create your first transaction!
                    </Text>
                  </View>
                )}
              </View>

              <SignOutButton />
            </SignedIn>
          </View>
        </View>
      </ScrollView>

      {/* Create Transaction Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
          onPress={() => setModalVisible(false)}
        >
          <Pressable 
            style={{ 
              flex: 1,
              justifyContent: 'flex-end',
            }}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={{ 
              backgroundColor: '#171717',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 24,
              maxHeight: '90%'
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
                  New Transaction
                </Text>
                <Pressable onPress={() => setModalVisible(false)}>
                  <Text style={{ color: '#dc2626', fontSize: 18, fontWeight: '600' }}>Close</Text>
                </Pressable>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Transaction Type Toggle */}
                <View style={{ 
                  flexDirection: 'row', 
                  marginBottom: 24, 
                  backgroundColor: '#262626', 
                  borderRadius: 12, 
                  padding: 4 
                }}>
                  <Pressable
                    onPress={() => setType("expense")}
                    style={{ 
                      flex: 1, 
                      paddingVertical: 12, 
                      borderRadius: 8,
                      backgroundColor: type === "expense" ? '#dc2626' : 'transparent'
                    }}
                  >
                    <Text style={{ 
                      textAlign: 'center', 
                      fontWeight: '600',
                      color: type === "expense" ? 'white' : '#a3a3a3'
                    }}>
                      Expense
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => setType("income")}
                    style={{ 
                      flex: 1, 
                      paddingVertical: 12, 
                      borderRadius: 8,
                      backgroundColor: type === "income" ? '#16a34a' : 'transparent'
                    }}
                  >
                    <Text style={{ 
                      textAlign: 'center', 
                      fontWeight: '600',
                      color: type === "income" ? 'white' : '#a3a3a3'
                    }}>
                      Income
                    </Text>
                  </Pressable>
                </View>

                {/* Title Input */}
                <View style={{ marginBottom: 16 }}>
                  <Text style={{ color: '#a3a3a3', marginBottom: 8 }}>Title</Text>
                  <TextInput
                    style={{ 
                      backgroundColor: '#262626', 
                      color: 'white', 
                      padding: 16, 
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: '#404040'
                    }}
                    placeholder="e.g., Grocery shopping"
                    placeholderTextColor="#666"
                    value={title}
                    onChangeText={setTitle}
                  />
                </View>

                {/* Amount Input */}
                <View style={{ marginBottom: 16 }}>
                  <Text style={{ color: '#a3a3a3', marginBottom: 8 }}>Amount (₹)</Text>
                  <TextInput
                    style={{ 
                      backgroundColor: '#262626', 
                      color: 'white', 
                      padding: 16, 
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: '#404040'
                    }}
                    placeholder="0.00"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                  />
                </View>

                {/* Category Selection */}
                <View style={{ marginBottom: 24 }}>
                  <Text style={{ color: '#a3a3a3', marginBottom: 8 }}>Category</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {categories.map((cat) => (
                      <Pressable
                        key={cat}
                        onPress={() => setCategory(cat)}
                        style={{ 
                          marginRight: 8, 
                          marginBottom: 8, 
                          paddingHorizontal: 16, 
                          paddingVertical: 8, 
                          borderRadius: 20, 
                          borderWidth: 1,
                          borderColor: category === cat ? (type === "expense" ? '#dc2626' : '#16a34a') : '#404040',
                          backgroundColor: category === cat ? (type === "expense" ? '#dc2626' : '#16a34a') : 'transparent'
                        }}
                      >
                        <Text style={{ 
                          color: category === cat ? 'white' : '#a3a3a3'
                        }}>
                          {cat}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>

                {/* Submit Button */}
                <Pressable
                  onPress={handleCreateTransaction}
                  disabled={isCreating}
                  style={{ 
                    paddingVertical: 16, 
                    borderRadius: 12,
                    marginBottom: 20,
                    backgroundColor: isCreating ? '#404040' : (type === "expense" ? '#dc2626' : '#16a34a')
                  }}
                >
                  <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600', fontSize: 16 }}>
                    {isCreating ? "Creating..." : "Create Transaction"}
                  </Text>
                </Pressable>
              </ScrollView>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
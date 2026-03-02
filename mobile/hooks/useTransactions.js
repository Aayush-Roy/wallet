// import { useCallback, useState } from "react";
// import { Alert } from "react-native";

// const API_URL="http://192.168.1.40:3000/api"
// export const useTransactions=(userId)=>{
//     const[transactions,setTransactions] = useState([]);
//     const [summary,setSummary] = useState({
//         balance:0,
//         income:0,
//         expenses:0
//     })

//     const[isLoading,setIsLoading]=useState(true);

//     const fetchTransaction=useCallback(async(userId)=>{
//         try{
//             const response = await fetch(`${API_URL}/transactions/${userId}`)
//             const data = await response.json();
//             setTransactions(data.user);
//             console.log("from hook", data)
//         }catch(err){
//             console.error("Error fetching transactions:", err)
//         }
//     },[userId])


//      const fetchSummary=useCallback(async(userId)=>{
//         try{
//             const response = await fetch(`${API_URL}/transactions/summary/${userId}`)
//             const data = await response.json();
//             setSummary(data);

//         }catch(err){
//             console.error("Error fetching transactions:", err)
//         }
//     },[userId])

//     const loadData = useCallback(async()=>{
//         if(!userId) return;
//         setIsLoading(true);
//         try{
//             await Promise.all([fetchTransaction(),fetchSummary()])
//         }catch(err){
//             console.log("Error loading data:", err)
//         }finally{
//             setIsLoading(false)
//         }
//     },[fetchTransaction,fetchSummary,userId])


//     const deleteTransaction = async(id)=>{
//         try{
//             const response = await fetch(`${API_URL}/transactions/${id}`, {method:"DELETE"})
//             if(!response.ok) throw new Error("Failed to delete transactions")
//             loadData();
//         Alert.alert("Success","Transaction deleted successfully")
//         }catch(err){
//             console.log("Error deleteing transactions:", err)
//             Alert.alert("Error", err.message)
//         }
//     }

//     return {transactions,summary,isLoading,loadData,deleteTransaction}
// }

// react custom hook file

import { useCallback, useState } from "react";
import { Alert } from "react-native";


// const API_URL = "https://wallet-api-cxqp.onrender.com/api";
const API_URL="http://192.168.1.40:3000/api"

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // useCallback is used for performance reasons, it will memoize the function
  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      // can be run in parallel
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete transaction");

      // Refresh data after deletion
      loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      Alert.alert("Error", error.message);
    }
  };

  return { transactions, summary, isLoading, loadData, deleteTransaction };
};
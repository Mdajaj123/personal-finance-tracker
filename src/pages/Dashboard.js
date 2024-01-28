import React, { useState, useEffect } from 'react'
import Header from '../components/Header';
import Cards from '../components/Cards';
// import moment from 'moment';
import { Modal } from 'antd';
import AddExpenseModal from '../components/Modals/AddExpenseModal';
import AddIncomeModal from '../components/Modals/AddIncomeModal.js';
import { addDoc, collection, query, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase.js';
import { useAuthState, } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import TransactionsTable from '../components/TransactionsTable';
import Chart from '../components/Chart/index.js';
import NoTransactions from '../components/NoTransactions.js';
const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  }
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  }
  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  }
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  }
  const onFinish = (values, type) => {
    console.log("On Finish", values, type);
    console.log(values.date);
    // const dateFormet = values.date ? values.date.format("YYYY-MM-DD") : null;
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: values.amount,
      name: values.name,
      tag: values.tag,
    };
    addTransaction(newTransaction);
  };
  async function addTransaction(transaction, many) {
    // Add the doc
    try {
      const docRef = await addDoc(collection(db, `users/${user.uid}/transactions`), transaction)
      console.log("Document written with ID: ", docRef.id);
      if (!many) toast.success("Transaction Added!")
      const newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
    }
    catch (e) {
      console.error("Error adding document: ", e);
      if (!many) toast.error("Couldn't add transaction!");
    }
  }
  useEffect(() => {
    // get all doc from a collections
    fetchTransactions()
  }, [user])
  useEffect(() => {
    calculateBalance();
  }, [transactions])
  function calculateBalance() {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        console.log("Add income");
        incomeTotal += transaction.amount;
      } else {
        expenseTotal += transaction.amount;
      }
    });
    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotalBalance(incomeTotal - expenseTotal);

  }
  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      const transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data is never undefined for query doc snapshot
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      console.log(transactionsArray);
      toast.success("Transaction Fetched!");
    }
    setLoading(false);
  }
  let sortedTransactions = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  return (
    <div>
      <Header />
      {
        loading ? <p>Loading...</p> :
          <>
            <Cards income={income} expense={expense} totalBalance={totalBalance} showExpenseModal={showExpenseModal}
              showIncomeModal={showIncomeModal}
            />

            <AddIncomeModal isIncomeModalVisible={isIncomeModalVisible} handleIncomeCancel={handleIncomeCancel} onFinish={onFinish} />

            <AddExpenseModal handleExpenseCancel={handleExpenseCancel} isExpenseModalVisible={isExpenseModalVisible} onFinish={onFinish} />
            {/* <Chart sortedTransactions={sortedTransactions} /> */}
            {
              transactions.length === 0 ? (
                <NoTransactions/>
              ) : (
                  <Chart sortedTransactions={sortedTransactions} />
              )
            }
            <TransactionsTable transactions={transactions} addTransaction={addTransaction} fetchTransactions={fetchTransactions} />
          </>
      }
    </div>
    
  )
}

export default Dashboard

// lecture 8 completed 

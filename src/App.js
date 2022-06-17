import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { Resume } from "./components/Resume";
import { ToastContainer } from 'react-toastify';
import GlobalStyle from "./styles/global";
import { useState, useEffect } from "react";

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const data = localStorage.getItem("transactions");
  const [transactionsList, setTransactionsList] = useState(
    data ? JSON.parse(data) : []
  );
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);

  const incomeAndExpenseCalculation = () => {
    const amountExpense = transactionsList
      .filter((item) => item.expense)
      .map((trasaction) => Number(trasaction.amount));

    const amountIncome = transactionsList
      .filter((item) => !item.expense)
      .map((trasaction) => Number(trasaction.amount));

    const expense = amountExpense.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    const income = amountIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2);

    const total = Math.abs(income - expense).toFixed(2);

    setIncome(`R$ ${income}`);
    setExpense(`R$ ${expense}`);

    setTotal(`${Number(income) < Number(expense) ? "-" : ""}R$ ${total}`);
  };

  useEffect(() => {
    incomeAndExpenseCalculation();
  }, [transactionsList]);

  const handleAdd = (transaction) => {
    const newArrayTransactions = [...transactionsList, transaction];
    setTransactionsList(newArrayTransactions);

    localStorage.setItem("transactions", JSON.stringify(newArrayTransactions));
  };

  return (
    <>
      <Header />
      <Resume income={income} expense={expense} total={total} />
      <Form handleAdd={handleAdd}/>
      <GlobalStyle />
      <ToastContainer/>
    </>
  );
}

export default App;

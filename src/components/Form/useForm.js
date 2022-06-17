import { useState } from "react";
import {toast} from "react-toastify"

export const useForm = (handleAdd) => {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [isExpense, setExpense] = useState(false);

  const generateID = () => Math.round(Math.random() * 1000);

  const handleSave = () => {
    if (!desc || !amount) {
        toast.warn("Informe descrição e valor");
      return;
    } else if (amount < 1) {
        toast.warn("O valor tem que ser positivo!");
      return;
    }
    const transaction = {
      id: generateID(),
      desc: desc,
      amount: amount,
      expense: isExpense,
    };

    handleAdd(transaction)
    setDesc("")
    setAmount("")
  };


  return {
    desc,
    setDesc,
    amount,
    setAmount,
    isExpense,
    setExpense,
    handleSave,
  };
};

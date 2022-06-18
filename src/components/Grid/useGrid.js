
export const useGrid = (itens, setItens) => {
  
  const onDelete = (ID) => {
    const newArray = itens.filter((transaction) => transaction.id !== ID);
    setItens(newArray);
    localStorage.setItem("transactions", JSON.stringify(newArray));
  };



  return {
    
    onDelete,
  };
};

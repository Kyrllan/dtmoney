import {createContext, useState, /* useEffect, */ ReactNode, useContext} from 'react';
//import { api } from '../services/api';
interface Transaction {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData,
);

export function TransactionsProvider({children}: TransactionProviderProps) {
  const [trasnactionId, setTransactionId] = useState(1);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  /*   useEffect(() => {
    api.get('transactions').then((response) => {
      setTransactions(response.data.transactions);
    });
  }); */

  async function createTransaction(transactionInput: TransactionInput) {
    const data: Transaction = {
      id: trasnactionId,
      title: transactionInput.title,
      amount: transactionInput.amount,
      category: transactionInput.category,
      type: transactionInput.type,
      createdAt: new Date().toISOString(),
    };

    setTransactionId(trasnactionId + 1);
    setTransactions([...transactions, data]);

    /*     const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });
    const {transaction} = response.data;

    setTransactions([...transactions, transaction]); */
  }

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}

import { goBack } from '../../../service/navigationService';
import { ActionTypes } from '../constants/actiontypes';

const initialState = {
  transactions: [],
  loading: false,
  error: null,
  totalIncome: 0,
  totalExpense: 0,
  profitLoss: 0,
};

export const transactionReducers = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ActionTypes.ADD_TRANSACTION_SUCCESS:
      const newTransaction = {
        ...action.payload,
        id: state.transactions.length + 1, // Use index as ID
        date: new Date(action.payload.date).toISOString(),
      };
      const newTransactionsAdd = [...state.transactions, newTransaction];
      goBack();

      return {
        ...state,
        transactions: newTransactionsAdd,
        ...calculateTotals(newTransactionsAdd),
        loading: false,
      };

    case ActionTypes.ADD_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ActionTypes.EDIT_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ActionTypes.EDIT_TRANSACTION_SUCCESS:
      console.log("EDIT_TRANSACTION_SUCCESS",JSON.stringify(action.payload,null,2))
      const updatedTransactionsEdit = state.transactions.map(transaction =>
        transaction.id === action.payload.id
          ? { ...action.payload, date: new Date(action.payload.date).toISOString() }
          : transaction
      );
      goBack();

      return {
        ...state,
        transactions: updatedTransactionsEdit,
        ...calculateTotals(updatedTransactionsEdit),
        loading: false,
      };

    case ActionTypes.DELETE_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ActionTypes.DELETE_TRANSACTION_SUCCESS:
      const updatedTransactionsDelete = state.transactions.filter(
        transaction => transaction.id !== action.payload.id
      );
      goBack();

      return {
        ...state,
        transactions: updatedTransactionsDelete,
        ...calculateTotals(updatedTransactionsDelete),
        loading: false,
      };

    case ActionTypes.DELETE_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ActionTypes.LOG_OUT_REQUEST:
      return initialState;

    default:
      return state;
  }
};

// Helper function to calculate total income, total expense, and profit/loss
const calculateTotals = (transactions) => {
  const totalIncome = transactions
    .filter(item => item.incomeOrExpense === 'income')
    .reduce((total, item) => total + parseFloat(item.amount), 0);

  const totalExpense = transactions
    .filter(item => item.incomeOrExpense === 'expense')
    .reduce((total, item) => total + parseFloat(item.amount), 0);

  return {
    totalIncome,
    totalExpense,
    profitLoss: totalIncome - totalExpense,
  };
};

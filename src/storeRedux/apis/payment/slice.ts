import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TPaymentState } from "./payment.types";
import { RootState } from "../../store";
import { api } from "../../api";

const initialState: TPaymentState = {
  listCurrency: [],
  currencies: null,
  loading: false,
  error: null,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setCurrencies: (state, action) => {
      state.currencies = action.payload;
    },
    setListCurrency: (state, action) => {
      state.listCurrency = action.payload;
    },
    cleanCurrencies: (state) => {
      state.currencies = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getCurrencies
      .addMatcher(api.endpoints.getCurrencies.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(
        api.endpoints.getCurrencies.matchFulfilled,
        (state, action) => {
          if (action.payload) {
            state.currencies = action.payload;
            state.loading = false;
            state.error = null;
          } else {
            state.loading = false;
            state.error = "Помилка валідації даних від сервера (getCurrencies)";
          }
        }
      )
      .addMatcher(api.endpoints.getCurrencies.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка отримання курсів валют";
      });
  },
});

export const { setCurrencies, setListCurrency, cleanCurrencies } =
  paymentSlice.actions;

export const usePaymentSelector = () =>
  useSelector((state: RootState) => state.payment);

export default paymentSlice.reducer;

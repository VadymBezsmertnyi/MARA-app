import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { api } from "../../api";
import { TSmsVerificationState } from "./sms-verification.types";

const initialState: TSmsVerificationState = {
  loading: false,
  error: null,
};

export const smsVerificationSlice = createSlice({
  name: "smsVerification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.sendSmsVerification.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.sendSmsVerification.matchFulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addMatcher(
        api.endpoints.sendSmsVerification.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Failed to send SMS";
        }
      )
      .addMatcher(api.endpoints.verifySmsCode.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.verifySmsCode.matchFulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addMatcher(
        api.endpoints.verifySmsCode.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Failed to verify code";
        }
      );
  },
});

export const useSmsVerificationSelector = () =>
  useSelector((state: RootState) => state.smsVerification);

export default smsVerificationSlice.reducer;

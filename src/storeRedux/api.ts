import {
  BaseQueryFn,
  createApi,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./helps";
import {
  loginFacebook,
  loginGoogle,
  loginApple,
  getMe,
  editUser,
  deleteUser,
} from "./apis/user/apis";
import {
  getEvents,
  getEventsUser,
  addEvent,
  changeEvent,
  deleteEvent,
} from "./apis/events/apis";
import { getCurrencies } from "./apis/payment/apis";
import {
  getWorkshops,
  getWorkshopsUser,
  addWorkshop,
  changeWorkshop,
  deleteWorkshop,
  addComment,
  changeComment,
} from "./apis/workshops/apis";
import {
  sendSmsVerification,
  verifySmsCode,
} from "./apis/sms-verification/apis";

export type Builder = EndpointBuilder<
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  never,
  "api"
>;

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    // User APIs
    loginFacebook: loginFacebook(builder),
    loginGoogle: loginGoogle(builder),
    loginApple: loginApple(builder),
    getMe: getMe(builder),
    editUser: editUser(builder),
    deleteUser: deleteUser(builder),
    // Events APIs
    getEvents: getEvents(builder),
    getEventsUser: getEventsUser(builder),
    addEvent: addEvent(builder),
    changeEvent: changeEvent(builder),
    deleteEvent: deleteEvent(builder),
    // Payment APIs
    getCurrencies: getCurrencies(builder),
    // Workshops APIs
    getWorkshops: getWorkshops(builder),
    getWorkshopsUser: getWorkshopsUser(builder),
    addWorkshop: addWorkshop(builder),
    changeWorkshop: changeWorkshop(builder),
    deleteWorkshop: deleteWorkshop(builder),
    addComment: addComment(builder),
    changeComment: changeComment(builder),
    // SMS Verification APIs
    sendSmsVerification: sendSmsVerification(builder),
    verifySmsCode: verifySmsCode(builder),
  }),
});

export const {
  // User Hooks APIs
  useLoginFacebookMutation,
  useLoginGoogleMutation,
  useLoginAppleMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useEditUserMutation,
  useDeleteUserMutation,
  // Events Hooks APIs
  useGetEventsQuery,
  useLazyGetEventsQuery,
  useGetEventsUserQuery,
  useLazyGetEventsUserQuery,
  useAddEventMutation,
  useChangeEventMutation,
  useDeleteEventMutation,
  // Payment Hooks APIs
  useGetCurrenciesQuery,
  useLazyGetCurrenciesQuery,
  // Workshops Hooks APIs
  useGetWorkshopsQuery,
  useLazyGetWorkshopsQuery,
  useGetWorkshopsUserQuery,
  useLazyGetWorkshopsUserQuery,
  useAddWorkshopMutation,
  useChangeWorkshopMutation,
  useDeleteWorkshopMutation,
  useAddCommentMutation,
  useChangeCommentMutation,
  // SMS Verification Hooks APIs
  useSendSmsVerificationMutation,
  useVerifySmsCodeMutation,
} = api;

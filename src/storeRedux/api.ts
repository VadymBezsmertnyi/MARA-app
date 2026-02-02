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
  getUserStats,
} from "./apis/user/apis";
import {
  getEvents,
  getEventsUser,
  getEventById,
  getClosestEvents,
  getEventsLocations,
  addEvent,
  changeEvent,
  deleteEvent,
  addEventComment,
  changeEventComment,
} from "./apis/events/apis";
import { getCurrencies } from "./apis/payment/apis";
import {
  getTelegramChannels,
  getTelegramCategories,
  getTelegramCountries,
  getTelegramCities,
  addTelegramChannel,
  reportTelegramChannel,
} from "./apis/telegram-channels/apis";
import {
  getWorkshops,
  getWorkshopsUser,
  getWorkshopById,
  addWorkshop,
  changeWorkshop,
  deleteWorkshop,
  addWorkshopComment,
  changeWorkshopComment,
} from "./apis/workshops/apis";
import {
  sendSmsVerification,
  verifySmsCode,
} from "./apis/sms-verification/apis";
import {
  getIpLocation,
  getMapPoints,
  getUserLocation,
  openLocationSettings,
} from "./apis/map/apis";

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
    getUserStats: getUserStats(builder),
    // Events APIs
    getEvents: getEvents(builder),
    getEventsUser: getEventsUser(builder),
    getEventById: getEventById(builder),
    getClosestEvents: getClosestEvents(builder),
    getEventsLocations: getEventsLocations(builder),
    addEvent: addEvent(builder),
    changeEvent: changeEvent(builder),
    deleteEvent: deleteEvent(builder),
    addEventComment: addEventComment(builder),
    changeEventComment: changeEventComment(builder),
    // Payment APIs
    getCurrencies: getCurrencies(builder),
    // Telegram Channels APIs
    getTelegramChannels: getTelegramChannels(builder),
    getTelegramCategories: getTelegramCategories(builder),
    getTelegramCountries: getTelegramCountries(builder),
    getTelegramCities: getTelegramCities(builder),
    addTelegramChannel: addTelegramChannel(builder),
    reportTelegramChannel: reportTelegramChannel(builder),
    // Workshops APIs
    getWorkshops: getWorkshops(builder),
    getWorkshopsUser: getWorkshopsUser(builder),
    getWorkshopById: getWorkshopById(builder),
    addWorkshop: addWorkshop(builder),
    changeWorkshop: changeWorkshop(builder),
    deleteWorkshop: deleteWorkshop(builder),
    addWorkshopComment: addWorkshopComment(builder),
    changeWorkshopComment: changeWorkshopComment(builder),
    // SMS Verification APIs
    sendSmsVerification: sendSmsVerification(builder),
    verifySmsCode: verifySmsCode(builder),
    // Map APIs
    getIpLocation: getIpLocation(builder),
    getUserLocation: getUserLocation(builder),
    openLocationSettings: openLocationSettings(builder),
    getMapPoints: getMapPoints(builder),
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
  useGetUserStatsQuery,
  useLazyGetUserStatsQuery,
  // Events Hooks APIs
  useGetEventsQuery,
  useLazyGetEventsQuery,
  useGetEventsUserQuery,
  useLazyGetEventsUserQuery,
  useGetEventByIdQuery,
  useLazyGetEventByIdQuery,
  useGetClosestEventsQuery,
  useLazyGetClosestEventsQuery,
  useGetEventsLocationsQuery,
  useLazyGetEventsLocationsQuery,
  useAddEventMutation,
  useChangeEventMutation,
  useDeleteEventMutation,
  useAddEventCommentMutation,
  useChangeEventCommentMutation,
  // Payment Hooks APIs
  useGetCurrenciesQuery,
  useLazyGetCurrenciesQuery,
  // Telegram Channels Hooks APIs
  useGetTelegramChannelsQuery,
  useLazyGetTelegramChannelsQuery,
  useGetTelegramCategoriesQuery,
  useLazyGetTelegramCategoriesQuery,
  useGetTelegramCountriesQuery,
  useLazyGetTelegramCountriesQuery,
  useGetTelegramCitiesQuery,
  useLazyGetTelegramCitiesQuery,
  useAddTelegramChannelMutation,
  useReportTelegramChannelMutation,
  // Workshops Hooks APIs
  useGetWorkshopsQuery,
  useLazyGetWorkshopsQuery,
  useGetWorkshopsUserQuery,
  useLazyGetWorkshopsUserQuery,
  useGetWorkshopByIdQuery,
  useLazyGetWorkshopByIdQuery,
  useAddWorkshopMutation,
  useChangeWorkshopMutation,
  useDeleteWorkshopMutation,
  useAddWorkshopCommentMutation,
  useChangeWorkshopCommentMutation,
  // SMS Verification Hooks APIs
  useSendSmsVerificationMutation,
  useVerifySmsCodeMutation,
  // Map Hooks APIs
  useGetIpLocationQuery,
  useLazyGetIpLocationQuery,
  useGetUserLocationQuery,
  useLazyGetUserLocationQuery,
  useOpenLocationSettingsMutation,
  useGetMapPointsQuery,
  useLazyGetMapPointsQuery,
} = api;

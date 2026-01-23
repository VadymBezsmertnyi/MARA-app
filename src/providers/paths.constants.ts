export const PATHS = {
  // user
  loginFacebook: "/user/login/facebook",
  loginGoogle: "/user/login/google",
  loginApple: "/user/login/apple",
  me: "/user/login/me",
  token: "/user/login/token",
  editUser: "/user/login/editUser",
  delete: "/user/login/delete",
  // events
  eventsGet: "/events/",
  eventsGetUserId: "/events/user/",
  eventAdd: "/events/add/",
  eventChange: "/events/change/",
  eventDelete: "/events/delete/",
  //workshops
  workshopsGet: "/workshops/",
  workshopsGetUserId: "/workshops/user/",
  workshopsAdd: "/workshops/add/",
  workshopsChange: "/workshops/change/",
  workshopsDelete: "/workshops/delete/",
  workshopsCommentsAdd: "/workshops/comments/add/",
  workshopsCommentsChange: "/workshops/comments/change/",
  // location
  locationUsers: "/location-users/",
  // places
  placesCountries: "/places/countries/",
  placesCountriesSearch: "/places/countries/search/",
  placesRegions: "/places/regions/",
  placesRegionsSearch: "/places/regions/search/",
  placesCities: "/places/cities/",
  placesCitiesSearch: "/places/cities/search/",
  placesCityId: "/places/cities/getPlaceId/",
  // other
  ipApiGetCountry: "http://ip-api.com/json",
} as const;

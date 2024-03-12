export const PATHS = {
  // user
  loginFacebook: "/user/login/facebook",
  loginGoogle: "/user/login/google",
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
  // market
  marketsProductsGet: "/markets/products/",
  marketsProductsGetUserId: "/markets/products/user/",
  marketsProductsAdd: "/markets/products/add/",
  marketsProductsChange: "/markets/products/change/",
  marketsProductsDelete: "/markets/products/delete/",
  marketsProductsMinMaxPricesGet: "/markets/products/minMaxPrices/",
  // location
  locationUsers: "/location-users/",
  locationUsersSosAdd: "/location-users/sos/add/",
  locationUsersSosDelete: "/location-users/sos/delete/",
  // places
  placesCountries: "/places/countries/",
  placesCitiesSearch: "/places/cities/search/",

  // other
  ipApiGetCountry: "http://ip-api.com/json",
} as const;

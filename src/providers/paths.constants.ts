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
} as const;

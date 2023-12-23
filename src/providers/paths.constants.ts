export const PATHS = {
  // user
  me: "/user/authorization/me",
  login: "/user/authorization/login",
  addPhone: "/user/registration/addPhone",
  editUser: "/user/registration/editUser",
  editUserChangePassword: "/user/registration/editUser/changePassword",
  // events
  eventsGet: "/events/",
  eventAdd: "/events/add/",
  eventDelete: "/events/delete/",
} as const;

import { forgotPasswordRoute } from "./forgotPasswordRoute.js";
import { getGoogleOauthUrlRoute } from "./getGoogleOauthUrlRoute.js";
import { googleOauthCallbackRoute } from "./googleOauthCallbackRoute.js";
import { logInRoute } from "./logInRoute.js";
import { resetPasswordRoute } from "./resetPasswordRoute.js";
import { signUpRoute } from "./signUpRoute.js";
import { testRoute } from "./testRoute.js";
import { updateUserInfoRoute } from "./updateUserInfoRoute.js";
import { verifyEmailRoute } from "./verifyEmailRoute.js";

export const routes = [
  forgotPasswordRoute,
  getGoogleOauthUrlRoute,
  googleOauthCallbackRoute,
  logInRoute,
  resetPasswordRoute,
  signUpRoute,
  testRoute,
  updateUserInfoRoute,
  verifyEmailRoute,
];

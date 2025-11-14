import { Router } from "express";
import passport from "passport";
import {
  homePageGet,
  signUpPageGet,
  logInPageGet,
} from "../controllers/readDB.js";
// import { addNewUser } from "../controllers/postToDB.js";
import {
  checkValidationResult,
  validateSignUpRules,
} from "../controllers/validations/validateSignUp.js";
import {
  validateLogInRules,
  checkLoginValidationResult,
} from "../controllers/validations/validateLogIn.js";

const indexRouter = Router();

indexRouter.get("/sign-up", signUpPageGet);
indexRouter.post(
  "/sign-up",
  validateSignUpRules,
  checkValidationResult
  // addNewUser
);

indexRouter.get("/log-in", logInPageGet);
indexRouter.post(
  "/log-in",
  validateLogInRules,
  checkLoginValidationResult,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })
);

indexRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

indexRouter.get("/", homePageGet);

export default indexRouter;

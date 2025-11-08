import { body, validationResult } from "express-validator";
import { getUserInfoByUsername } from "../../prisma_queries/find.js";

export const validateSignUpRules = [
  body("username")
    .trim()
    .isEmail()
    .withMessage("Email: Should be an email")
    .isLength({ min: 8, max: 250 })
    .withMessage("Email: Has to have a length of between 8 and 250")
    .custom(async (value) => {
      const rows = await getUserInfoByUsername(value);
      const user = rows[0];
      if (!user) {
        return true;
      }
      throw new Error("Email: Has already been Added");
    }),
  body("fullname")
    .trim()
    .matches(/^[A-Za-z\s]+$/) // Allows letters and spaces
    .withMessage("Full Name: must contain only letters")
    .isLength({ min: 8, max: 250 })
    .withMessage("Full Name: Has to have a length of between 8 and 250"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 250 })
    .withMessage("Password: Has to have a length of between 8 and 250"),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm Password is required")
    .isLength({ min: 8, max: 250 })
    .withMessage("Confirm Password: Has to have a length of between 8 and 250")
    .custom(async (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match Password");
      }
      return true;
    }),
  body("isAdmin").optional().toBoolean(true),
];

export const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const checkAdmin = req.body.isAdmin || false;
    return res.status(400).render("signUp", {
      errors: errors.array(),
      username: req.body.username,
      fullname: req.body.fullname,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      isAdmin: checkAdmin,
    });
  } else {
    next();
  }
};

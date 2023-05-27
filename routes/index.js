import express from "express";
// import userController from "../controllers/userController";

import authController from "../controllers/authController.js";
import userController from "../controllers/userController.js";
import { userValidationRules, validate } from "../helpers/validator.js";

const router = express.Router();

//Sets a basic route
router.get("/", (req, res) => {
  res.render("home", {
    layout: false,
    showTitle: true,

    // Override `foo` helper only for this rendering.
    // helpers: {
    //   foo() {
    //     return "foo.";
    //   },
    // },
  });
});

router.post("/login", authController.login);

//1. Validate the registration
//2. register the user
//3. we need to log them in
router.post(
  "/register",
  userValidationRules(),
  validate,
  userController.register,
  authController.login
);

export default router;

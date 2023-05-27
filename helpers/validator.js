import { body, validationResult } from "express-validator";

const formattedValidationResults = validationResult.withDefaults({
  formatter: (error) => {
    return {
      field: error.path,
      message: error.msg,
    };
  },
});

export const userValidationRules = () => {
  return [
    body("email").isEmail(),
    body("name").isLength({ min: 3, max: 30 }),
    body("password").isStrongPassword({
      minLength: 8,
      minSymbols: 1,
      minNumbers: 1,
      minUppercase: 1,
      minLowercase: 1,
    }),
  ];
};

export const validate = (req, res, next) => {
  console.log("validate!!");
  const errors = formattedValidationResults(req);
  console.log(errors.array());
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json({
    errors: errors.array(),
  });
};

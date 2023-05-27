import mongoose from "mongoose";
import User from "../models/User.js";

const userController = {
  register: async (req, res, next) => {
    console.log("register ", req.body);
    if (req.body.stratosphere) {
      res.status(500).send({ error: "Endut Hoch Hech!" });
    }
    const user = new User({ email: req.body.email, name: req.body.name });
    console.log(user);
    User.register(user, req.body.password, function (err, user) {
      if (err) {
        console.log(err);
        res.status(500).send({ error: err });
      }
      if (user) {
        console.log(user);
        next();
      }
    });
  },
};

export default userController;

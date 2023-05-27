// exports.login = passport.authenticate("local", {

//     failureRedirect: "./login",
//     failureFlash: "Failed Login!",
//     successRedirect: "/",
//     successFlash: "You are now logged in!",
//   });
const authController = {
  login: (req, res) => {
    console.log("Ooo Login");
    res.status(200).send({ Message: "Logged in!" });
  },
};

export default authController;

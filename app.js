import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { create } from "express-handlebars";
import routes from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
// import { engine } from "express-handlebars";

const hbs = create({
  // Specify helpers which are only registered on this instance.
  helpers: {
    foo() {
      return "FOO!";
    },
    bar() {
      return "BAR!";
    },
  },
});

// create our Express app
const app = express();

// view engine setup
app.set("view engine", "pug"); // we use the engine pug, mustache or EJS work great too

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views")); // this is the folder where we keep our pug files

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, "/public")));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
// !! Old version
// app.use(expressValidator());

// Connect to our Database and handle an bad connections
// mongoose.connect(
//   `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(
//     process.env.DB_PASSWORD
//   )}${process.env.DB_URL}`
// );

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
//     // mongooseConnection has been removed. Please update your application code to use either mongoUrl, client or clientPromise
//     store: MongoStore.create({
//       client: mongoose.connection.getClient(),
//       dbName: process.env.DB_NAME,
//       collectionName: "sessions",
//       stringify: false,
//       autoRemove: "interval",
//       autoRemoveInterval: 1,
//     }),
//   })
// );

// After allllll that above middleware, we finally handle our own routes!
app.use("/", routes);

// done! we export it so we can start the site in start.js
export default app;

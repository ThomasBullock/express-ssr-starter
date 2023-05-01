import express from "express";
// const session = require("express-session");
import path from "path";
import { fileURLToPath } from "url";
import { create } from "express-handlebars";

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

//Sets a basic route
app.get("/", (req, res) => {
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

// done! we export it so we can start the site in start.js
export default app;

import "dotenv/config";
import mongoose from "mongoose";
// import User from "./models/User.js";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);

// dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

console.log("------------------------------------");
console.log(process.env);

// Start our app!
import app from "./app.js";

app.set("port", process.env.PORT || 7878);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

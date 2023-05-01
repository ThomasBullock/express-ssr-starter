// Start our app!
import app from "./app.js";

app.set("port", process.env.PORT || 7878);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

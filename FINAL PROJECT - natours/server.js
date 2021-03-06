const app = require("./app");
const dotenv = require("dotenv");
// set mongoose
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB)
  .then((con) => {
    // console.log(con.connection);
    console.log("DB CONNECTION SUCCESSFUL");
  })
  .catch((err) => {
    console.log(err);
  });

// testing the schema and model
// const testTour = new Tour({
//   name: "The Forest Hiker",
//   rating: 4.7,
//   price: 497,
// });
// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// server the app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("you server is on in " + port);
});

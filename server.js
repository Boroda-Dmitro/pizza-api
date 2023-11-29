import app from "./app.js";

import mongoose from "mongoose";

// const { BD_HOST } = process.env;

const BD_HOST =
  "mongodb+srv://Dimbor:xW3aTufhkk7d3X7m@cluster0.iautypv.mongodb.net/pizza-api?retryWrites=true&w=majority";

mongoose
  .connect(BD_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });


// http://localhost:3000/

// xW3aTufhkk7d3X7m


import mongoose from "mongoose";

const uri = process.env.DB_URI;

console.log(process.env.DB_URI);

mongoose
  .connect(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database: " + err);
  });

export default mongoose;

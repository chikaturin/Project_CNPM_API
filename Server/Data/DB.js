const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://chikaturin:123@cluster0.zi5ms1b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((e) => {
    console.error("Did not connect to MongoDB", e);
  });
module.exports = mongoose;

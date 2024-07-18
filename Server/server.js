const express = require("express");
const app = express();
const cors = require("cors");

const database = require("./Data/DB.js");
const KhachHang = require("./Schema/schema.js");

app.use(cors());
app.use(express.json());
const PORT = 3000;

app.use("/api", require("./Route/KhachHangRoute.js"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

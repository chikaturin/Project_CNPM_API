const express = require("express");
const cors = require("cors");
const KhachHang = require("./Schema/schema.js");

// Kết nối MongoDB không sử dụng các tùy chọn deprecated

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.post("/", (req, res) => {
  res.send("Hello, This is API of Thanh");
});

app.post("/api/CreateKhachHang", async (req, res) => {
  console.log(req.body);
  try {
    const newKhachHang = new KhachHang(req.body);
    await newKhachHang.save();
    res.status(200).json({ newKhachHang });
  } catch (e) {
    console.error("Error occurred while saving to MongoDB:", e);
    res.status(500).json(e);
  }
});

app.post("/api/GetKhachHang", async (req, res) => {
  try {
    const khachHang = await KhachHang.find({});
    res.status(200).json({ khachHang });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

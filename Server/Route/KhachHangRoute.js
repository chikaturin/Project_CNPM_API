const express = require("express");
const route = express.Router();
const {
  GetKhachHang,
  CreateKhachHang,
  UpdateKhachHang,
  DeleteKhachHang,
} = require("../Controller/KhachHangController.js");

route.get("/GetKhachHang", GetKhachHang);
route.post("/CreateKhachHang", CreateKhachHang);
route.put("/UpdateKhachHang/:id", UpdateKhachHang);
route.delete("/DeleteKhachHang/:id", DeleteKhachHang);
module.exports = route;

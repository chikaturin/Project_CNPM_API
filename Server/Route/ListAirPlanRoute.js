const express = require("express");
const route = express.Router();
const {
  GetDanhSachSanBay,
  DeleteDanhSachSanBay,
  CreateDanhSachSanBay,
} = require("../Controller/ListAirplanController.js");

route.post("/GetDanhSachSanBay", GetDanhSachSanBay);
route.post("/CreateDanhSachSanBay", CreateDanhSachSanBay);
route.delete("/DeleteDanhSachSanBay/:id", DeleteDanhSachSanBay);
module.exports = route;

const express = require("express");
const route = express.Router();

const {
  GetBuyTicketBus,
  FindBuyTicketBusMaDX,
  BuyTicketBus,
  SchedularChange,
  CancelBooking,
} = require("../Controller/BuyTicketBusController.js");

route.post("/GetBuyTicketBus", GetBuyTicketBus);
route.post("/BuyTicketBus", BuyTicketBus);
route.get("/FindBuyTicketBusMaDX/:MaVeBus", FindBuyTicketBusMaDX);
route.put("/BuyTicketBus/SchedularChange/:id", SchedularChange);
route.delete("/CancelBookingBus/:MaDX", CancelBooking);

module.exports = route;

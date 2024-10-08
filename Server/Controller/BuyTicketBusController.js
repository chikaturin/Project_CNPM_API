const PhieuDatXeBus = require("../Schema/schema.js").PhieuDatXeBus;
const CounterDatBuyt = require("../Schema/schema.js").CounterDatBuyt;
const lichSuDatXeBus = require("../Schema/schema.js").LichSuDatXeBus;

const GetBuyTicketBus = async (req, res) => {
  try {
    const buyTicketBus = await PhieuDatXeBus.find();
    res.status(200).json({ buyTicketBus });
  } catch (e) {
    res.status(500).json("not get buy ticket bus");
  }
};

const BuyTicketBus = async (req, res) => {
  try {
    const { MaPT, MaTram, SLVe, DiemDon, DiemTra, NgayGioKhoiHanh, ThanhTien } =
      req.body;

    if (
      !MaPT ||
      !MaTram ||
      !SLVe ||
      !DiemDon ||
      !DiemTra ||
      !NgayGioKhoiHanh ||
      !ThanhTien
    ) {
      return res.status(400).json("Thiếu thông tin");
    }

    if (SLVe <= 0) {
      return res.status(400).json({ message: "Số lượng vé phải lớn hơn 0." });
    }

    const CounterdatBuyt = await CounterDatBuyt.findOneAndUpdate(
      { _id: "datbuytCounter" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const MaDX = `DB${CounterdatBuyt.seq}`;

    const buyTicketBus = new PhieuDatXeBus({
      MaVeBus: MaDX,
      MaPT,
      MaTram,
      SLVe,
      DiemDon,
      DiemTra,
      NgayGioKhoiHanh: new Date(NgayGioKhoiHanh),
      ThanhTien,
      TrangThai: false,
    });

    await buyTicketBus.save();
    res.status(200).json({ buyTicketBus });
  } catch (e) {
    console.error(e);
    res.status(500).json("not create buy ticket bus");
  }
};

const FindBuyTicketBusMaDX = async (req, res) => {
  try {
    const { MaVeBus } = req.params;
    const buyTicketBus = await PhieuDatXeBus.findOne({ MaVeBus });

    if (!buyTicketBus) {
      return res.status(404).json({ message: "Bus ticket not found" });
    }

    res.status(200).json({ buyTicketBus });
  } catch (e) {
    console.error("Error fetching bus ticket by MaVeBus:", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const SchedularChange = async (req, res) => {
  try {
    const { id } = req.params;
    const { NgayGioDat } = req.body;

    const newNgayGioDat = new Date(NgayGioDat);
    if (newNgayGioDat < new Date()) {
      return res.status(400).json({
        message: "Ngày giờ đặt phải lớn hơn hoặc bằng ngày hiện tại.",
      });
    }

    await PhieuDatXeBus.findByIdAndUpdate(id, {
      $set: { NgayGioDat: newNgayGioDat },
    });
    res.status(200).json({ message: "Đã cập nhật Ngày giờ đặt thành công." });
  } catch (e) {
    console.error("Lỗi khi cập nhật PhieuDatXeBus:", e);
    res.status(500).json({ error: "Không thể cập nhật Ngày giờ đặt." });
  }
};

const CancelBooking = async (req, res) => {
  try {
    const { MaVeBus } = req.params;
    if (!MaVeBus) {
      return res.status(400).json("Thiếu thông tin");
    }
    await PhieuDatXeBus.findByIdAndDelete({ MaVeBus });
    await lichSuDatXeBus.deleteOne({ MaVeBus });
    res.status(200).json({ message: "PhieuDatXeBus deleted successfully" });
  } catch (e) {
    res.status(500).json("not delete dat xe o to");
  }
};

module.exports = {
  GetBuyTicketBus,
  BuyTicketBus,
  SchedularChange,
  CancelBooking,
  FindBuyTicketBusMaDX,
};

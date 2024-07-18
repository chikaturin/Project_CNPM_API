const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const KhachHangSchema = new Schema({
  MaCus: {
    type: String,
    required: true,
    unique: true,
    maxlength: 5,
  },
  TenKH: {
    type: String,
    maxlength: 100,
  },
  Sdt: {
    type: String,
    maxlength: 10,
  },
});

const DanhSachSanBaySchema = new mongoose.Schema({
  MaSB: { type: String, required: true, uinque: true },
  TenSanBay: { type: String, required: true, maxlength: 100 },
  ThanhPho: { type: String, required: true, maxlength: 100 },
});

const TuyenSchema = new mongoose.Schema({
  MaTuyen: { type: String, required: true, unique: true, maxlength: 5 },
  DiemKhoiHanh: { type: String, required: true, maxlength: 100 },
  DiemKetThuc: { type: String, required: true, maxlength: 100 },
  ThoiGianKhoiHanh: { type: Date, required: true },
  ThoiGianKetThuc: { type: Date, required: true },
  diemKhoiHanhSanBay: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DanhSachSanBay",
  },
  diemKetThucSanBay: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DanhSachSanBay",
  },
});

const PhuongTienSchema = new mongoose.Schema({
  MaPT: { type: String, required: true, unique: true, maxlength: 5 },
  MaTuyen: { type: mongoose.Schema.Types.ObjectId, ref: "Tuyen" },
  MaLoai: { type: Boolean, required: true },
  TenPhuongTien: { type: String, required: true, maxlength: 100 },
  SoGheToiDa: { type: Number, required: true },
});

const TramDungSchema = new mongoose.Schema({
  MaTram: { type: String, required: true, unique: true, maxlength: 5 },
  MaTuyen: { type: mongoose.Schema.Types.ObjectId, ref: "Tuyen" },
  DiaChi: { type: String, required: true, maxlength: 100 },
  ThoiGianDung: { type: String, required: true, maxlength: 100 },
  GiaTienVe: { type: Number, required: true, maxlength: 100 },
});

const ChiTietXeOtoSchema = new mongoose.Schema({
  MaDetailCar: { type: String, required: true, unique: true, maxlength: 5 },
  TenHangXe: { type: String, required: true, maxlength: 100 },
  TenChuSoHuu: { type: String, required: true, maxlength: 100 },
  SoHanhLyToiDa: { type: Number, required: true },
  BienSoXe: { type: String, required: true, maxlength: 10 },
  CongTy: { type: String, required: true, maxlength: 100 },
  SDT_TaiXe: { type: String, required: true, maxlength: 10 },
  SoGheToiDa: { type: Number, required: true, maxlength: 100 },
  SoTien_1km: { type: Number, required: true, maxlength: 100 },
  MaSB: { type: mongoose.Schema.Types.ObjectId, ref: "DanhSachSanBay" },
});

const DatXeOtoSchema = new mongoose.Schema({
  MaDX: { type: String, required: true, unique: true, maxlength: 5 },
  MaDetailCar: { type: mongoose.Schema.Types.ObjectId, ref: "ChiTietXeOto" },
  MaCus: { type: mongoose.Schema.Types.ObjectId, ref: "KhachHang" },
  DiemDon: { type: String, required: true, maxlength: 100 },
  DiemTra: { type: String, required: true, maxlength: 100 },
  SoLuongHanhKhach: { type: Number, required: true },
  NgayGioDat: { type: Date, required: true },
  SoKm: { type: Number, required: true },
  ThanhTien: { type: Number, required: true },
  Trangthai: { type: Boolean, required: true },
});

const AppraiseCarSchema = new mongoose.Schema({
  MaDX: { type: mongoose.Schema.Types.ObjectId, ref: "DatXeOto" },
  MaCus: { type: mongoose.Schema.Types.ObjectId, ref: "KhachHang" },
  SoSao: { type: Number, required: true },
  NoiDung: { type: String, required: true, maxlength: 500 },
});

const PhieuDatTauSchema = new mongoose.Schema({
  MaVeTau: { type: String, required: true, unique: true, maxlength: 5 },
  MaCus: { type: mongoose.Schema.Types.ObjectId, ref: "KhachHang" },
  MaPT: { type: mongoose.Schema.Types.ObjectId, ref: "PhuongTien" },
  SLVeNguoiLon: { type: Number, required: true },
  SLVeTreEm: { type: Number, required: true },
  DiemDon: { type: String, required: true, maxlength: 100 },
  DiemTra: { type: String, required: true, maxlength: 100 },
  NgayGioKhoiHanh: { type: Date, required: true },
  ThanhTien: { type: Number, required: true },
  TrangThai: { type: Boolean, required: true },
});

const AppraiseTrainSchema = new mongoose.Schema({
  MaTau: { type: mongoose.Schema.Types.ObjectId, ref: "PhieuDatTau" },
  MaCus: { type: mongoose.Schema.Types.ObjectId, ref: "KhachHang" },
  SoSao: { type: Number, required: true },
  NoiDung: { type: String, required: true, maxlength: 500 },
});

const PhieuDatXeBusSchema = new mongoose.Schema({
  MaVeBus: { type: String, required: true, unique: true, maxlength: 5 },
  MaCus: { type: mongoose.Schema.Types.ObjectId, ref: "KhachHang" },
  MaPT: { type: mongoose.Schema.Types.ObjectId, ref: "PhuongTien" },
  SLVe: { type: Number, required: true },
  DiemDon: { type: String, required: true, maxlength: 100 },
  DiemTra: { type: String, required: true, maxlength: 100 },
  NgayGioKhoiHanh: { type: Date, required: true },
  ThanhTien: { type: Number, required: true },
  TrangThai: { type: Boolean, required: true },
});

const AppraiseBusSchema = new mongoose.Schema({
  MaBus: { type: mongoose.Schema.Types.ObjectId, ref: "PhieuDatXeBus" },
  MaCus: { type: mongoose.Schema.Types.ObjectId, ref: "KhachHang" },
  SoSao: { type: Number, require: true },
  NoiDung: { type: String, require: true, maxlength: 500 },
});

const LichSuDatXeOtoSchema = new mongoose.Schema({
  MaDX: { type: mongoose.Schema.Types.ObjectId, ref: "DatXeOto", maxlength: 5 },
});

const LichSuDatTauSchema = new mongoose.Schema({
  MaVeTau: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PhieuDatTau",
    maxlength: 5,
  },
});

const LichSuDatXeBusSchema = new mongoose.Schema({
  MaVeBus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PhieuDatXeBus",
    maxlength: 5,
  },
});

let new_value = 1;
DatXeOtoSchema.pre("save", async function (next) {
  try {
    let { SoTien_1km } = await ChiTietXeOto.findOne({
      MaDetailCar: this.MaDetailCar,
    });
    let SoKm = this.SoKm;

    this.MaDX = `DXCar${new_value}`;
    this.ThanhTien = SoTien_1km * SoKm;
    this.NgayGioDat = new Date();
    new_value += 1;

    next();
  } catch (err) {
    next(err);
  }
});

PhieuDatXeBusSchema.pre("save", async function (next) {
  try {
    let { GiaTienVe, SLVe } = this;
    let ThanhTien = GiaTienVe * SLVe;
    this.MaVeBus = `PTBus${new_value}`;
    this.ThanhTien = ThanhTien;
    new_value += 1;

    next();
  } catch (err) {
    next(err);
  }
});

PhieuDatTauSchema.pre("save", async function (next) {
  try {
    let { SLVeNguoiLon, SLVeTreEm } = this;
    let { GiaTienVe } = await PhuongTien.findOne({ MaPT: this.MaPT });
    let ThanhTien = GiaTienVe * SLVeNguoiLon + GiaTienVe * 0.5 * SLVeTreEm;
    this.MaVeTau = `PTTau${new_value}`;
    this.ThanhTien = ThanhTien;
    new_value += 1;

    next();
  } catch (err) {
    next(err);
  }
});

TuyenSchema.pre("save", async function (next) {
  try {
    let { MaSB: diemKhoiHanhSanBay, diemKetThucSanBay } = this;
    this.MaTuyen = `Tuyen${new_value}`;
    new_value += 1;

    next();
  } catch (err) {
    next(err);
  }
});

const KhachHang = mongoose.model("KhachHang", KhachHangSchema);
const DanhSachSanBay = mongoose.model("DanhSachSanBay", DanhSachSanBaySchema);
const Tuyen = mongoose.model("Tuyen", TuyenSchema);
module.exports = { KhachHang, DanhSachSanBay, Tuyen };

const mongoose = require("mongoose");

const KhachHangSchema = new mongoose.Schema({
  MaCus: { type: String, required: true },
  TenKH: { type: String, required: true },
  Sdt: { type: Number, required: true },
});

const DanhSachSanBaySchema = new mongoose.Schema({
  MaSB: { type: String, required: true },
  TenSanBay: { type: String, required: true },
  ThanhPho: { type: String, required: true },
});

const TuyenSchema = new mongoose.Schema({
  MaTuyen: { type: String, required: true },
  DiemKhoiHanh: { type: String, required: true },
  DiemKetThuc: { type: String, required: true },
  ThoiGianKhoiHanh: { type: String, required: true },
  ThoiGianKetThuc: { type: String, required: true },
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
  MaPT: { type: String, required: true },
  MaTuyen: { type: mongoose.Schema.Types.ObjectId, ref: "Tuyen" },
  MaLoai: { type: Boolean, required: true },
  TenPhuongTien: { type: String, required: true },
  SoGheToiDa: { type: Number, required: true },
});

const TramDungSchema = new mongoose.Schema({
  MaTram: { type: String, required: true },
  MaTuyen: { type: mongoose.Schema.Types.ObjectId, ref: "Tuyen" },
  DiaChi: { type: String, required: true },
  ThoiGianDung: { type: String, required: true },
  GiaTienVe: { type: Number, required: true },
});

const ChiTietXeOtoSchema = new mongoose.Schema({
  MaDetailCar: { type: String, required: true },
  TenHangXe: { type: String, required: true },
  TenChuSoHuu: { type: String, required: true },
  SoHanhLyToiDa: { type: Number, required: true },
  BienSoXe: { type: String, required: true },
  CongTy: { type: String, required: true },
  SDT_TaiXe: { type: String, required: true },
  SoGheToiDa: { type: Number, required: true },
  SoTien_1km: { type: Number, required: true },
  MaSB: { type: mongoose.Schema.Types.ObjectId, ref: "DanhSachSanBay" },
});

const DatXeOtoSchema = new mongoose.Schema({
  MaDX: { type: String, required: true },
  MaDetailCar: { type: mongoose.Schema.Types.ObjectId, ref: "ChiTietXeOto" },
  MaCus: { type: mongoose.Schema.Types.ObjectId, ref: "KhachHang" },
  DiemDon: { type: String, required: true },
  DiemTra: { type: String, required: true },
  SoLuongHanhKhach: { type: Number, required: true },
  NgayGioDat: { type: Date, required: true },
  SoKm: { type: Number, required: true },
  ThanhTien: { type: Number, required: true },
  Trangthai: { type: Boolean, required: true },
});

const AppraiseCarSchema = new mongoose.Schema({
  MaAC: { type: String, required: true },
  MaDX: { type: mongoose.Schema.Types.ObjectId, ref: "DatXeOto" },
  MaCus: { type: mongoose.Schema.Types.ObjectId, ref: "KhachHang" },
  SoSao: { type: Number, required: true },
  NoiDung: { type: String, required: true },
});

const PhieuDatTauSchema = new mongoose.Schema({
  MaVeTau: { type: String, required: true },
  MaCus: { type: mongoose.Schema.Types.ObjectId, ref: "KhachHang" },
  MaPT: { type: mongoose.Schema.Types.ObjectId, ref: "PhuongTien" },
  SLVeNguoiLon: { type: Number, required: true },
  SLVeTreEm: { type: Number, required: true },
  DiemDon: { type: String, required: true },
  DiemTra: { type: String, required: true },
  NgayGioKhoiHanh: { type: Date, required: true },
  ThanhTien: { type: Number, required: true },
  TrangThai: { type: Boolean, required: true },
});

const AppraiseTrainSchema = new mongoose.Schema({
  MaAT: { type: String, required: true },
  MaTau: { type: mongoose.Schema.Types.ObjectId, ref: "PhieuDatTau" },
  MaCus: { type: mongoose.Schema.Types.ObjectId, ref: "KhachHang" },
  SoSao: { type: Number, required: true },
  NoiDung: { type: String, required: true },
});

const PhieuDatXeBusSchema = new mongoose.Schema({
  MaVeBus: { type: String, required: true },
  MaCus: { type: mongoose.Schema.Types.ObjectId, ref: "KhachHang" },
  MaPT: { type: mongoose.Schema.Types.ObjectId, ref: "PhuongTien" },
  SLVe: { type: Number, required: true },
  DiemDon: { type: String, required: true },
  DiemTra: { type: String, required: true },
  NgayGioKhoiHanh: { type: Date, required: true },
  ThanhTien: { type: Number, required: true },
  TrangThai: { type: Boolean, required: true },
});

const AppraiseBusSchema = new mongoose.Schema({
  MaAB: { type: String, required: true },
  MaBus: { type: mongoose.Schema.Types.ObjectId, ref: "PhieuDatXeBus" },
  MaCus: { type: mongoose.Schema.Types.ObjectId, ref: "KhachHang" },
  SoSao: { type: Number, require: true },
  NoiDung: { type: String, require: true },
});

const LichSuDatXeOtoSchema = new mongoose.Schema({
  MaLS: { type: Number, required: true },
  MaDX: { type: mongoose.Schema.Types.ObjectId, ref: "DatXeOto" },
});

const LichSuDatTauSchema = new mongoose.Schema({
  MaLS: { type: Number, required: true },
  MaVeTau: { type: mongoose.Schema.Types.ObjectId, ref: "PhieuDatTau" },
});

const LichSuDatXeBusSchema = new mongoose.Schema({
  MaLS: { type: Number, required: true },
  MaVeBus: { type: mongoose.Schema.Types.ObjectId, ref: "PhieuDatXeBus" },
});

const KhachHang = mongoose.model("KhachHang", KhachHangSchema);
module.exports = KhachHang;

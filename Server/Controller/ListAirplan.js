const DanhSachSanBay = require("../Schema/schema").DanhSachSanBay;

const GetDanhSachSanBay = async (req, res) => {
  try {
    const danhSachSanBay = await DanhSachSanBay.find({});
    res.status(200).json({ danhSachSanBay });
  } catch (e) {
    res.status(500).json("not get danh sach san bay");
  }
};

const CreateDanhSachSanBay = async (req, res) => {
  try {
    const CreateDanhSachSanBay = new DanhSachSanBay(req.body);
    await CreateDanhSachSanBay.save();
    res.status(200).json({ CreateDanhSachSanBay });
  } catch (e) {
    res.status(500).json("not create danh sach san bay");
  }
};

const DeleteDanhSachSanBay = async (req, res) => {
  try {
    const { id } = req.params;
    await DanhSachSanBay.findByIdAndDelete(id);
    res.status(200).json({ message: "DanhSachSanBay deleted successfully" });
  } catch (e) {
    res.status(500).json("not delete danh sach san bay");
  }
};

module.exports = {
  GetDanhSachSanBay,
  CreateDanhSachSanBay,
  DeleteDanhSachSanBay,
};

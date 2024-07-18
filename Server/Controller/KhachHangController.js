const KhachHang = require("../Schema/schema.js").KhachHang;

const GetKhachHang = async (req, res) => {
  try {
    const khachHang = await KhachHang.find({});
    res.status(200).json({ khachHang });
  } catch (e) {
    res.status(500).json("not get khach hang");
  }
};

const CreateKhachHang = async (req, res) => {
  try {
    const newKhachHang = new KhachHang(req.body);
    await newKhachHang.save();
    res.status(200).json({ newKhachHang });
  } catch (e) {
    console.error("Error occurred while saving to MongoDB:", e);
    res.status(500).json(e);
  }
};

const UpdateKhachHang = async (req, res) => {
  try {
    const { id } = req.params;
    const UpdatekhachHang = await KhachHang.findByIdAndUpdate(id, req.body);
    await UpdatekhachHang.save();
    res.status(200).json({ UpdatekhachHang });
  } catch (e) {
    console.error("Error occurred while updating to MongoDB:", e);
    res.status(500).json(e);
  }
};

const DeleteKhachHang = async (req, res) => {
  try {
    const { id } = req.params;
    await KhachHang.findByIdAndDelete(id);
    res.status(200).json({ message: "KhachHang deleted successfully" });
  } catch (e) {
    console.error("Error occurred while deleting to MongoDB:", e);
    res.status(500).json(e);
  }
};

module.exports = {
  GetKhachHang,
  CreateKhachHang,
  UpdateKhachHang,
  DeleteKhachHang,
};

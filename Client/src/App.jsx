import React, { useState } from "react";
import axios from "axios";

function KhachHangForm() {
  const [formData, setFormData] = useState({
    MaCus: "",
    TenKH: "",
    Sdt: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/CreateKhachHang",
        formData
      );
      alert("Khách hàng được tạo:", response.data);
    } catch (error) {
      alert("Lỗi khi tạo khách hàng:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="MaCus"
        placeholder="Mã Khách Hàng"
        value={formData.MaCus}
        onChange={handleChange}
      />
      <input
        type="text"
        name="TenKH"
        placeholder="Tên Khách Hàng"
        value={formData.TenKH}
        onChange={handleChange}
      />
      <input
        type="number"
        name="Sdt"
        placeholder="Số Điện Thoại"
        value={formData.Sdt}
        onChange={handleChange}
      />
      <button type="submit">Tạo Khách Hàng</button>
    </form>
  );
}

export default KhachHangForm;

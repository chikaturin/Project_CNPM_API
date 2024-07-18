import React, { useState } from "react";
import axios from "axios";

const KhachHangForm = () => {
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

  function UpdateKhachHangForm({ id }) {
    const [formData, setFormData] = useState({
      TenKH: "",
      Sdt: "",
    });

    const handleSubmitupdate = async (e) => {
      e.preventDefault();
      console.log(formData); // In ra dữ liệu để kiểm tra
      try {
        const response = await axios.put(
          `http://localhost:3000/api/UpdateKhachHang/${id}`,
          formData
        );
        console.log("Khách hàng được cập nhật:", response.data);
      } catch (error) {
        console.error("Lỗi khi cập nhật khách hàng:", error);
      }
    };

    return (
      <div>
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
        <form onSubmit={handleSubmitupdate}>
          <input
            type="text"
            name="TenKH"
            placeholder="Tên Khách Hàng"
            value={formData.TenKH}
            onChange={handleChange}
          />
          <input
            type="text"
            name="Sdt"
            placeholder="Số Điện Thoại"
            value={formData.Sdt}
            onChange={handleChange}
          />
          <button type="submit">Cập nhật Khách Hàng</button>
        </form>
      </div>
    );
  }
};
export default KhachHangForm;

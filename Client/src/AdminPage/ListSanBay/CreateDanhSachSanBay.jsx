import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateDanhSachSanBay = () => {
  const [danhSachSanBay, setDanhSachSanBay] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!danhSachSanBay.TenSanBay || !danhSachSanBay.ThanhPho) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:3000/api/CreateDanhSachSanBay",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(danhSachSanBay),
        }
      );

      const data = await res.json();

      if (res.status === 200) {
        alert("Thêm sân bay thành công");
        navigate("/");
      } else {
        console.error(data);
        alert("Đã xảy ra lỗi khi thêm sân bay");
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi khi kết nối tới máy chủ");
    }
  };

  return (
    <div className="w-full h-full bg-white">
      <h1 className=" text-center text-2xl text-black pt-4 font-extrabold">
        Thêm danh sách sân bay
      </h1>
      <div className="pt-4 flex justify-center">
        <div className="w-1/2">
          <label className="text-black">Tên Sân Bay</label>
          <input
            type="text"
            value={danhSachSanBay.TenSanBay || ""}
            onChange={(e) =>
              setDanhSachSanBay({
                ...danhSachSanBay,
                TenSanBay: e.target.value,
              })
            }
            className="w-full mt-2 bg-slate-100 border-black rounded-lg  p-2"
          />
          <label className="text-black">Thành phố</label>
          <input
            type="text"
            value={danhSachSanBay.ThanhPho || ""}
            onChange={(e) =>
              setDanhSachSanBay({
                ...danhSachSanBay,
                ThanhPho: e.target.value,
              })
            }
            className="w-full mt-2 bg-slate-100 border-black rounded-lg  p-2"
          />
          <div className="flex justify-center">
            <button
              disabled={!danhSachSanBay.TenSanBay || !danhSachSanBay.ThanhPho}
              onClick={handleSubmit}
              className="bg-blue-500 px-4 py-2 mt-4 w-fit h-fit hover:bg-blue-700 text-white font-bold rounded"
            >
              Thêm sân bay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDanhSachSanBay;

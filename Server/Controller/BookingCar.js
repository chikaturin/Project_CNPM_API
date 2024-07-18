const  = require("../Schema/schema.js");

const CreateDatXeCar = async (req, res) => {
    app.post('/phieudatxebus', async (req, res) => {
        try {
            const { MaCus, MaPT, SLVe, DiemDon, DiemTra, NgayGioKhoiHanh, TrangThai } = req.body;
    
            const newPhieuDatXeBus = new PhieuDatXeBus({
                MaVeBus,
                MaCus,
                MaPT,
                SLVe,
                DiemDon,
                DiemTra,
                NgayGioKhoiHanh,
                ThanhTien: 0, 
                TrangThai
            });
    
            // Lưu đối tượng vào MongoDB
            await newPhieuDatXeBus.save();
    
            // Trả về kết quả thành công với MaVeBus và ThanhTien
            res.status(201).json({
                MaVeBus: newPhieuDatXeBus.MaVeBus,
                ThanhTien: newPhieuDatXeBus.ThanhTien,
                message: 'Đã tạo mới PhieuDatXeBus thành công!'
            });
        } catch (err) {
            // Xử lý lỗi nếu có
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};
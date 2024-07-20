import React, { useState } from "react";
import axios from "axios";

const SearchForm = () => {
  const [diemKhoiHanh, setDiemKhoiHanh] = useState("");
  const [diemKetThuc, setDiemKetThuc] = useState("");
  const [ngayDi, setNgayDi] = useState("");
  const [gioDi, setGioDi] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState({
    sanBays: [],
    tramDungs: [],
  });
  const [selectedTramDungId, setSelectedTramDungId] = useState(""); // New state for tram dung ID

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/search", {
        diemKhoiHanh,
        diemKetThuc,
        ngayDi,
        gioDi,
        tramDungId: selectedTramDungId, // Send the selected tram dung ID
      });
      setResults(response.data);
      setError(null);
    } catch (err) {
      setError("Có lỗi xảy ra khi tìm kiếm");
      setResults(null);
    }
  };

  const fetchAirportSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/SuggestsAirpost?query=${query}`
      );
      setSuggestions((prevSuggestions) => ({
        ...prevSuggestions,
        sanBays: response.data.sanBays,
      }));
    } catch (err) {
      setError("Lỗi khi lấy gợi ý sân bay: " + err.message);
    }
  };

  const fetchTramDungSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/SuggestsTramDung?query=${query}&diemKhoiHanh=${diemKhoiHanh}`
      );
      setSuggestions((prevSuggestions) => ({
        ...prevSuggestions,
        tramDungs: response.data.tramDungs,
      }));
    } catch (err) {
      setError("Lỗi khi lấy gợi ý trạm dừng: " + err.message);
    }
  };

  const handleSuggestionClick = (suggestion, type) => {
    if (type === "sanBays") {
      setDiemKhoiHanh(suggestion);
      setSuggestions({ sanBays: [], tramDungs: [] });
    } else if (type === "tramDungs") {
      setDiemKetThuc(suggestion.diaChi); // Assuming suggestion contains diaChi
      setSelectedTramDungId(suggestion.id); // Assuming suggestion contains id
      setSuggestions({ sanBays: [], tramDungs: [] });
    }
  };

  return (
    <div>
      <h1>Tìm Kiếm Tuyến</h1>
      <form onSubmit={handleSearch}>
        <div>
          <label>Điểm Khởi Hành:</label>
          <input
            type="text"
            value={diemKhoiHanh}
            onChange={(e) => {
              setDiemKhoiHanh(e.target.value);
              fetchAirportSuggestions(e.target.value);
            }}
          />
          <ul>
            {suggestions.sanBays.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion, "sanBays")}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <label>Điểm Kết Thúc:</label>
          <input
            type="text"
            value={diemKetThuc}
            onChange={(e) => {
              setDiemKetThuc(e.target.value);
              fetchTramDungSuggestions(e.target.value);
            }}
          />
          <ul>
            {suggestions.tramDungs.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion, "tramDungs")}
              >
                {suggestion.diaChi} {/* Assuming suggestion contains diaChi */}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <label>Ngày Đi:</label>
          <input
            type="date"
            value={ngayDi}
            onChange={(e) => setNgayDi(e.target.value)}
          />
        </div>
        <div>
          <label>Giờ Đi:</label>
          <input
            type="time"
            value={gioDi}
            onChange={(e) => setGioDi(e.target.value)}
          />
        </div>
        <button type="submit">Tìm Kiếm</button>
      </form>
      {results && (
        <div>
          <h2>Kết Quả:</h2>
          <p>Sân Bay: {results.sanBay}</p>
          <p>Trạm Dừng: {results.tramDung}</p>
          <p>Ngày Đi: {results.ngayDi}</p>
          <p>Giờ Đi: {results.gioDi}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default SearchForm;

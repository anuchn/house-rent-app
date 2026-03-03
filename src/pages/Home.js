import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [houses, setHouses] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: ""
  });

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    const res = await axios.get("http://localhost:5000/api/houses");
    setHouses(res.data.houses);
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await axios.get(
      `http://localhost:5000/api/houses?${query}`
    );
    setHouses(res.data.houses);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/houses/${id}`);
    fetchHouses();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🏠 Find Your Perfect House</h1>

      {/* Modern Search Box */}
      <div style={styles.searchBox}>
        <input
          name="location"
          placeholder="Search by location..."
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="minPrice"
          type="number"
          placeholder="Min Price"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="maxPrice"
          type="number"
          placeholder="Max Price"
          onChange={handleChange}
          style={styles.input}
        />
        <button style={styles.searchBtn} onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Cards */}
      <div style={styles.grid}>
        {houses.map((house) => (
          <div key={house._id} style={styles.card}>
            <h3 style={{ marginBottom: "10px" }}>{house.title}</h3>
            <p><strong>📍 Location:</strong> {house.location}</p>
            <p><strong>💰 Price:</strong> ₹ {house.price}</p>

            <div style={{ marginTop: "15px" }}>
              <button
                style={styles.deleteBtn}
                onClick={() => handleDelete(house._id)}
              >
                Delete
              </button>

              <Link to={`/edit/${house._id}`}>
                <button style={styles.editBtn}>Edit</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------- STYLES -------- */

const styles = {
  container: {
    padding: "50px",
    background: "linear-gradient(to right, #f9fafb, #eef2ff)",
    minHeight: "100vh"
  },
  heading: {
    textAlign: "center",
    marginBottom: "40px"
  },
  searchBox: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "40px",
    flexWrap: "wrap"
  },
  input: {
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    width: "180px",
    outline: "none"
  },
  searchBtn: {
    padding: "12px 20px",
    backgroundColor: "#6366f1",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  grid: {
    display: "grid",
    gap: "25px",
    maxWidth: "800px",
    margin: "0 auto"
  },
  card: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 14px",
    marginRight: "10px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  editBtn: {
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Home;
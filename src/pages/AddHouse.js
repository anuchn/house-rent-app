import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddHouse() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    location: "",
    price: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/houses", form);
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2>Add New House</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Add House
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
    background: "#f3f4f6"
  },
  formBox: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "350px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px"
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "5px"
  }
};

export default AddHouse;
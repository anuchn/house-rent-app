import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditHouse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    location: "",
    price: ""
  });

  // Fetch house data
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/houses")
      .then((res) => {
        const house = res.data.houses.find((h) => h._id === id);
        if (house) {
          setForm({
            title: house.title,
            location: house.location,
            price: house.price
          });
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/houses/${id}`, form);
      alert("House updated successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Error updating house");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit House</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Update House</button>
      </form>
    </div>
  );
}

export default EditHouse;
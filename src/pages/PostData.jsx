import { useState } from "react";
import ReactDOM from 'react-dom/client'
import { NavLink } from 'react-router-dom';
import { Link } from "react-router-dom";
const AddProduct = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://api.escuelajs.co/api/v1/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.title,
        price: Number(formData.price),
        description: formData.description,
        categoryId: 10, // REQUIRED by this API
        images: [formData.image]
      })
    });

    const data = await res.json();

    onAdd(data);

    setFormData({
      title: "",
      price: "",
      description: "",
      image: ""
    });
  };

  return (
    <>
        {/* <Navlink to="">
            <button className="bg-red-500 p-3 my-10 text-white text-2xl rounded-2xl">Back to Product</button>
        </Navlink> */}
        <Link to={"/App"}>
            <button className="bg-red-500 p-3 my-10 text-white text-2xl rounded-2xl">Back to Product</button>
        </Link>
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto my-8 space-y-3"
    >
      <h2 className="text-xl font-bold text-center">Add Product</h2>

      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        value={formData.title}
        className="w-full p-2 border rounded"
      />

      <input
        name="price"
        placeholder="Price"
        type="number"
        onChange={handleChange}
        value={formData.price}
        className="w-full p-2 border rounded"
      />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        value={formData.description}
        className="w-full p-2 border rounded"
      />

      <input
        name="image"
        placeholder="Image URL"
        onChange={handleChange}
        value={formData.image}
        className="w-full p-2 border rounded"
      />

      <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
    </>
  );
};

export default AddProduct;

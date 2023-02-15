import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import axios from "axios";
import { BACKEND_URL } from "../../service/authService";

const Button = ({ setUpdateUI }) => {
  const handleChange = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    axios
      .post(`${BACKEND_URL}/api/save`, formData)
      .then((res) => {
        // console.log(res.data);
        setUpdateUI(res.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <label className="button" htmlFor="file_picker">
      <AiFillPlusCircle />
      <input
        hidden
        type="file"
        name="file_picker"
        id="file_picker"
        onChange={(e) => handleChange(e)}
      />
    </label>
  );
};

export default Button;

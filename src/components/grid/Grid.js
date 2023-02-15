import pdfImg from "../../assets/pdf.png";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../service/authService";
import { useState } from "react";
import { SpinnerImg } from "../loader/Loader";

const Grid = ({ files, setUpdateUI }) => {
  const [isLoading, setIsLoading] = useState(false);
  const delProduct = (id) => {
    setIsLoading(true);
    axios
      .delete(`${BACKEND_URL}/api/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "File deleted.") {
          setUpdateUI(id);
          toast.success("File Removed Successfully");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };
  return (
    <>
      <h1 style={{ textAlign: "center", padding: "22px" }}>Our Files</h1>
      <p style={{ textAlign: "center", padding: "22px" }}>
        *only <b>.pdf | .docx</b> files are supported to upload
      </p>
      <div className="grid">
        {isLoading && <SpinnerImg />}
        {files.map((item, _id) => (
          <div key={_id} className="grid__item">
            <span
              className="close__icon"
              onClick={() => confirmDelete(item._id)}
            >
              X
            </span>
            {/* <img
              src={`http://localhost:5000/uploads/${file}`}
              alt="grid_image"
            /> */}
            <a href={`${BACKEND_URL}/public/uploads/${item.files}`}>
              <img src={pdfImg} alt="grid_image" />
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;

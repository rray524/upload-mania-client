import pdfImg from "../../assets/pdf.png";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../service/authService";
import React, { useState } from "react";
import { SpinnerImg } from "../loader/Loader";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Grid = ({ files, setUpdateUI }) => {
  const [ids, setIds] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(ids);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal(id) {
    setIsOpen(true);
    setIds(id);
  }

  function closeModal() {
    setIsOpen(false);
  }
  //************** */ delete file from list
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
  // ************* update file
  const handleChange = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    console.log(e.target.files[0]);

    axios
      .patch(`${BACKEND_URL}/api/edit/${ids}`, formData)
      .then((res) => {
        console.log(res.data);
        setUpdateUI(res.data._id);
        toast.success("File changed successfully");
        setIsOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // confirmation alert before deleting files
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
      {/* invoke modal component as update form to change files */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div
          className="form_header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h2>Update </h2>
          <button onClick={closeModal}>X</button>
        </div>

        <form>
          <input
            type="file"
            accept="application/pdf,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => handleChange(e)}
            name="file_picker"
            id="file_picker"
          />
        </form>
      </Modal>
      {/* all files list */}
      <div className="grid">
        {isLoading && <SpinnerImg />}

        {files.map((item, _id) => (
          <div key={_id} className="grid__item">
            {/* edit icon */}
            <span className="edit__icon">
              <button onClick={() => openModal(item._id)}>Edit</button>
            </span>
            {/* delete icon */}
            <span
              className="close__icon"
              onClick={() => confirmDelete(item._id)}
            >
              X
            </span>
            {/* show pdf/docx file */}
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

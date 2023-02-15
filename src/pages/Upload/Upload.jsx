import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import Grid from "../../components/grid/Grid";
import Header from "../../components/Header/Header";
import useRedirectLoggedOutUser from "../../hook/useRedirectLoggedOutUser";
import { BACKEND_URL } from "../../service/authService";

const Upload = () => {
  useRedirectLoggedOutUser("/login");
  const [files, setFiles] = useState([]);
  const [updateUI, setUpdateUI] = useState("");
  //   console.log(updateUI);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/get`)
      .then((res) => {
        // console.log(res.data);
        setFiles(res.data);
      })
      .catch((err) => console.log(err));
  }, [updateUI]);
  //   console.log(files);
  return (
    <div>
      <Header />
      <Grid files={files} setUpdateUI={setUpdateUI} />
      <Button setUpdateUI={setUpdateUI} />
    </div>
  );
};

export default Upload;

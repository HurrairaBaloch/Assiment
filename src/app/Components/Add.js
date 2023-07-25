import React, { useState } from "react";
import styles from "../Styling/style.module.css";
import { addCheckInToFirebase } from "../Components/data";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = {
  backgroundColor: "black",
  color: "white",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "white",
    color: "black",
  },
};

const useStylecancel = {
  backgroundColor: "white",
  color: "black",
  textTransform: "none",
  border: "1px solid #4444",
  "&:hover": {
    backgroundColor: "white",
    color: "black",
  },
};

const AddCheckInBox = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [imgUrl, setStatuss] = useState("");
  const [owner, setOwner] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleStatussChange = (e) => {
    setStatuss(e.target.value);
  };

  const handleOwnerChange = (e) => {
    setOwner(e.target.value);
  };

  const handleAdd = () => {
    onAdd({ title, owner, imgUrl }); // Pass the imgUrl as part of the data
    addCheckInToFirebase(title, owner, imgUrl);
  };

  return (
    <div className={styles.addCheckInBox}>
      <div className={styles.closeIcon} onClick={onClose}>
        <CloseIcon />
      </div>

      <h1>New Check In</h1>
      <div className={styles.line}></div>

      <input
        type="text"
        placeholder="Check In Title"
        name="title"
        value={title}
        onChange={handleTitleChange}
      />
      <input
        placeholder="Owner"
        value={owner}
        name="owner"
        onChange={handleOwnerChange}
      />

      <input
        placeholder="Image Url"
        value={imgUrl}
        name="imgUrl"
        onChange={handleStatussChange}
      />

      <div className={styles.buttons}>
        <Button style={useStylecancel} onClick={onClose}>
          Cancel
        </Button>
        <Button style={useStyles} onClick={handleAdd}>
          Create CheckIn
        </Button>
      </div>
    </div>
  );
};

export default AddCheckInBox;

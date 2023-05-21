import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Modal } from "@mui/material";
import { styled } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Styles for the modal content
const ModalContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "5px",
  outline: "none",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});
const Home = () => {
  const initialFormValues = {
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    temperature: 0,
    humidity: 0,
    pH: 0,
    rainfall: 0,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [crop, setcrop] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleInputChange = (event) => {
    setError(false);
    const { id, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: parseFloat(value),
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // chek if all the fields are filled
    for (const key in formValues) {
      if (isNaN(formValues[key]) || formValues[key] === 0) {
        setError(true);
        return;
      }
    }

    setIsLoading(true);
    // Handle form submission logic here
    axios.post("http://localhost:5000/predict", formValues).then((res) => {
      console.log(res.data);
      setcrop(res.data.crop);
      setIsLoading(false);
      setIsModalOpen(true);
    });
    console.log(formValues);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>Crop Prediction</h1>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "400px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#f8f8f8",
          //   boxShadow: "0 0 10px #ccc",
          boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <TextField
            id="nitrogen"
            label="Nitrogen"
            type="number"
            variant="outlined"
            size="small"
            InputProps={{ inputProps: { min: 0 } }}
            onChange={handleInputChange}
          />
          <TextField
            id="phosphorus"
            label="Phosphorus"
            type="number"
            variant="outlined"
            size="small"
            InputProps={{ inputProps: { min: 0 } }}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <TextField
            id="potassium"
            label="Potassium​"
            type="number"
            variant="outlined"
            size="small"
            InputProps={{ inputProps: { min: 0 } }}
            onChange={handleInputChange}
          />
          <TextField
            id="temperature"
            label="Temperature​"
            type="number"
            variant="outlined"
            size="small"
            InputProps={{ inputProps: { min: 0 } }}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <TextField
            id="humidity"
            label="Humidity"
            type="number"
            variant="outlined"
            size="small"
            InputProps={{ inputProps: { min: 0 } }}
            onChange={handleInputChange}
          />
          <TextField
            id="pH"
            label="pH​"
            type="number"
            variant="outlined"
            size="small"
            InputProps={{ inputProps: { min: 0 } }}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <TextField
            id="rainfall"
            label="Rainfall​"
            type="number"
            variant="outlined"
            size="small"
            InputProps={{ inputProps: { min: 0 } }}
            onChange={handleInputChange}
          />
          <TextField style={{ visibility: "hidden" }} />
        </div>
        {error && (
          <Alert severity="error">
            <strong>Please Fill All the Fileds</strong>
          </Alert>
        )}
        <Button
          variant="contained"
          //   color="primary"
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading}
          style={{ backgroundColor: "#45526e" }}
        >
          {isLoading ? "Loading..." : "Predict"}
        </Button>
      </Box>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <ModalContent>
          <CheckCircleIcon sx={{ fontSize: 80, color: "green" }} />
          <h2 id="modal-title">Success</h2>
          <p id="modal-description">You Can grow {crop} in the filed!</p>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Home;

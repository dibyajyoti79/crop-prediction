const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
// const sklearn = require("scikit-learn");
const predict = require("./predict");

const app = express();
const port = 5000;
// Set view engine
app.set("view engine", "ejs");
app.set("views");

// Set static path
app.use(express.static("public"));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post("/predict", async (req, res) => {
  try {
    console.log(req.body);
    const {
      nitrogen,
      phosphorus,
      potassium,
      temperature,
      humidity,
      pH,
      rainfall,
    } = req.body;
    const inputData = [
      [nitrogen, phosphorus, potassium, temperature, humidity, pH, rainfall],
    ];
    const prediction = await predict(inputData);
    console.log("Prediction:", prediction);
    res.send({ success: true, crop: prediction });
  } catch (e) {
    console.log("The Exception message is:", e);
    res.send({ success: false, error: "Something went wrong!" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

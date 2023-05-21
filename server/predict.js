const { PythonShell } = require("python-shell");
const path = require("path");
const predict = async (data) => {
  // Set the path to your Python script and pickle file
  //   const pythonScriptPath = "./make_prediction.py";
  const pythonScriptPath = path.join(__dirname, "make_prediction.py");
  const pickleFilePath = path.join(__dirname, "crop_rec.pickle");

  // Set up the options for the Python shell
  const options = {
    mode: "text",
    pythonPath:
      "C:/Users/dibya/AppData/Local/Programs/Python/Python311/python.exe",
    args: [pickleFilePath, JSON.stringify(data)],
  };

  // Execute the Python script

  let prediction = await PythonShell.run(
    pythonScriptPath,
    options,
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        prediction = JSON.parse(result);
        console.log(prediction);
      }
    }
  );
  return prediction;
};

module.exports = predict;

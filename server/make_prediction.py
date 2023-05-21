import pickle
import sys
import json

# Get the file paths from command line arguments
pickle_file_path = sys.argv[1]
input_data = json.loads(sys.argv[2])

# # loading the model file from the storage
# loaded_model = pickle.load(open(pickle_file_path, 'rb')) 
# # predictions using the loaded model file
# prediction=loaded_model.predict(input_data)
# print('prediction is', prediction)


# Load the scikit-learn model from the pickle file
with open(pickle_file_path, 'rb') as file:
    model = pickle.load(file)

# Make predictions
predictions = model.predict(input_data)

# Convert predictions to JSON format and print
json_predictions = json.dumps(predictions.tolist())
print(json_predictions)

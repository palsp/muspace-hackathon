//initialized app
const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");

//create Middleware to upload photos to dir uploads
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart({ uploadDir: "./backend/uploads" });

const projectId = "muspaceharvestmoon";
const location = "us-central1";
const modelId = "ICN5359303347780190208";
// const filePath = "./backend/test.jpg";

// Imports the Google Cloud AutoML library
const { PredictionServiceClient } = require("@google-cloud/automl").v1;
const fs = require("fs");

// Instantiates a client
const client = new PredictionServiceClient();

// Read the file content for translation.

async function predict(uploadedPath) {
  const content = fs.readFileSync(uploadedPath);

  // Construct request
  // params is additional domain-specific parameters.
  // score_threshold is used to filter the result
  const request = {
    name: client.modelPath(projectId, location, modelId),
    payload: {
      image: {
        imageBytes: content,
      },
    },
  };

  const [response] = await client.predict(request);

  for (const annotationPayload of response.payload) {
    console.log(`Predicted class name: ${annotationPayload.displayName}`);
    console.log(
      `Predicted class score: ${annotationPayload.classification.score}`
    );
  }

  return response.payload;
}

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api/upload", (req, res, next) => {
  next();
});
app.get("/api/upload", (req, res) => {
  res.json({
    message: "The backend is up and running",
  });
});

app.post("/api/upload", multipartMiddleware, async (req, res) => {
  const uploadedPath = req.files.uploads[0].path;
  let resultAutoML = await predict(uploadedPath);

  res.send({ result: resultAutoML[0], uploadedPath });
});
app.use(function (err, req, res, next) {
  res.json({ error: err.message });
});
app.listen(port || 3000, () => {
  console.log(`The backend is up and running on port ${port}`);
});

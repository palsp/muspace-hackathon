//initialized app
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart({ uploadDir: "./backend/uploads" });

//connect to AutoMl Vision
const projectId = "muspaceharvestmoon";
const location = "us-central1";
const modelId = "ICN7091447577899433984";

// const filePath = "./backend/1.jpeg";

// Imports the Google Cloud AutoML library
const { PredictionServiceClient } = require("@google-cloud/automl").v1;
const fs = require("fs");

// Instantiates a client
const client = new PredictionServiceClient();

// Read the file content for translation.

// const content = fs.readFileSync(filePath);

async function predict(toFilePath, classPicture) {
  realContent = fs.readFileSync(toFilePath);
  // Construct request
  // params is additional domain-specific parameters.
  // score_threshold is used to filter the result
  const request = {
    name: client.modelPath(projectId, location, modelId),
    payload: {
      image: {
        imageBytes: realContent,
      },
    },
  };

  const [response] = await client.predict(request);

  classPicture = [...response.payload];

  for (const annotationPayload of response.payload) {
    console.log(`Predicted class name: ${annotationPayload.displayName}`);
    console.log(
      `Predicted class score: ${annotationPayload.classification.score}`
    );
  }
  return classPicture;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/upload", function (request, response, next) {
  next();
});

app.get("/api/upload", (req, res) => {
  res.json({ message: "hello" });
});

app.post("/api/upload", multipartMiddleware, async (req, res) => {
  let uploadFilePath = req.files.uploads[0].path;
  console.log(uploadFilePath);
  var classPicture = new Array(3);

  let realClass = await predict(uploadFilePath, classPicture);

  res.send({ classArray: realClass });
});

app.use(function (err, req, res, next) {
  res.json({ error: err.message });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const multer = require("multer"); // Added multer for handling file uploads
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

mongoose.connect("mongodb://127.0.0.1:27017/AMS");

// Setup multer storage to store images in 'uploads' directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Serve images statically from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

// Route to render the form for uploading images
app.get("/", (req, res) => {
  res.send(`
    <form action="/images" method="post" enctype="multipart/form-data">
      <input type="file" name="images" multiple>
      <button type="submit">Upload</button>
    </form>
    <div>
      <h2>Uploaded Images:</h2>
      <!-- Display uploaded images here -->
      <div id="uploadedImages"></div>
    </div>
    <script>
      // Function to display uploaded images
      function displayImages(images) {
        const container = document.getElementById("uploadedImages");
        container.innerHTML = "";
        images.forEach((image) => {
          const imgElement = document.createElement("img");
          imgElement.src = "/uploads/" + image.filename;
          imgElement.alt = image.originalname;
          container.appendChild(imgElement);
        });
      }

      // Fetch uploaded images and display them
      fetch("/images")
        .then((response) => response.json())
        .then((data) => {
          displayImages(data);
        });
    </script>
  `);
});

// Route to handle image uploads
app.post("/images", upload.array("images"), (req, res) => {
  // Array of uploaded files is available in req.files
  console.log("Req.files: ", req.files.length);
  const uploadedImages = req.files.map((file) => ({
    filename: file.filename,
    originalname: file.originalname,
  }));


  res.json(uploadedImages);
});

// Route to display thumbnails and URLs of all images
app.get("/allimages", (req, res) => {
  const imagesDirectory = path.join(__dirname, "uploads");
  fs.readdir(imagesDirectory, (err, files) => {
    if (err) {
      console.error("Error reading images directory:", err);
      return res.status(500).send("Internal Server Error");
    }

    const imageList = files.map((file) => ({
      filename: file,
      url: `http://localhost:8080/uploads/${file}`,
    }));

    // Create an HTML table with thumbnails and URLs
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Image Thumbnails</title>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            table, th, td {
              border: 1px solid black;
            }
            img {
              max-width: 100px;
              max-height: 100px;
            }
          </style>
        </head>
        <body>
          <h2>Image Thumbnails</h2>
          <table>
            <tr>
              <th>Thumbnail</th>
              <th>File URL</th>
            </tr>
            ${imageList
              .map(
                (image) => `
                <tr>
                  <td><img src="${image.url}" alt="${image.filename}"></td>
                  <td>${image.url}</td>
                </tr>
              `
              )
              .join("")}
          </table>
        </body>
      </html>
    `;

    res.send(html);
  });
});


app.listen(8080, function () {
  console.log(
    "server started...\nClick the url to gain access: http://localhost:8080/"
  );
});

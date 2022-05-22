require("dotenv").config();
const express = require("express");
const app = express();
var multer = require("multer");
var cookieParser = require("cookie-parser");


const { authenticateToken } = require("./middleware");
// Routes
const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Multer set up
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });


// Authentication Routes
app.post("/token", authRoutes.refreshToken);
app.delete("/logout", authRoutes.deleteRefreshToken);
app.post("/login", authRoutes.loginUser);

// Protected Routes
app.get("/posts", postRoutes.listPosts);
app.get("/post/:title", postRoutes.findPost);
app.post(
  "/post",
  [authenticateToken, upload.single("qr_code")],
  postRoutes.createPost
);
app.delete("/post/:title", authenticateToken, postRoutes.deletePost);

app.listen(4000, () => {
  console.log("Main server running on Port 4000");
});

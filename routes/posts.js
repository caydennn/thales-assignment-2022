
const path = require("path");
var QrCode = require("qrcode-reader");
var Jimp = require("jimp");
const fs = require("fs");


// Mock Database
let posts = [
  {
    username: "cayden",
    title: "post 1",
  },
];

exports.listPosts = function (req, res) {
  res.json(posts);
};

exports.findPost = function (req, res) {
  const postTitle = req.params.title;
  res.json(posts.filter((post) => post.title === postTitle));
};

exports.createPost = function (req, res) {
  /* 
  Create a post by processing QR code containing data in the format
  { username: ... , title: ... }
  */

  if (path.extname(req.file.originalname).toLowerCase() === ".png") {
    const targetPath = path.join(
      __dirname,
      "../uploads/" + req.file.originalname
    );

    var buffer = fs.readFileSync(targetPath);
    Jimp.read(buffer, function (err, image) {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      }

      var qr = new QrCode();
      qr.callback = function (err, value) {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        }
        if (value) {

          // * Assume that data in QR code is in the correct format
          // Eg. {username: ... , title: ...}
          try {
            posts.push(JSON.parse(value.result));
          } catch (e) {
            res.status(500).end(e.toString());
          }
          console.log(posts);
          res.sendStatus(201);
        }
      };

      qr.decode(image.bitmap);
    });
  } else {
    res
      .status(403)
      .contentType("text/plain")
      .end("Only .png files are allowed!");
  }
};

exports.deletePost = function (req, res) {
  // Deleting a post
  // In production, inform user upon successful/unsuccessful deletes
  posts = posts.filter((post) => post.title !== req.params.title);
  res.status(204).end("Deletion operation was successful")
};

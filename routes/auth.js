require("dotenv").config();
const jwt = require("jsonwebtoken");

// In production, would use a Redis or DB for these
let refreshTokens = [];

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
}

// '/token'
exports.refreshToken = (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken });
  });
};

// '/logout'
exports.deleteRefreshToken = (req, res) => {
  console.log("Deleting refresh token")
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
};

exports.loginUser = (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  console.log(user);
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET); // manually handle these refresh tokens
  refreshTokens.push(refreshToken);
  // res.json({ accessToken: accessToken, refreshToken: refreshToken });
  res.cookie("token", accessToken, { httpOnly: true }).sendStatus(200);
};

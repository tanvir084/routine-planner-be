const addHeader = (req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept",
    "auth-access-token",
    "auth-refresh-token"
  );
  next();
};

module.exports = addHeader;

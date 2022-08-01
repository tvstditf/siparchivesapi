const jwt = require("jsonwebtoken");
const config = require("./config");

//Token Verification
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, config.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.log("Token is Invalid");
        return res.status(403).json("Token is InValid!!!!");
      }
      req.user = user;
      next();
    });
  } else {
    console.log("You are not authenticated");
    return res.status(401).json("You are not Authenticated to view this Page");
  }
};

//Authentication Code
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      res
        .status(403)
        .json(
          "You are not authorised!!!. Please contact TVSTD Databank Desk Office for More Information"
        );
    }
  });
};

const verifyTokenAndAO = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user.isAO ||
      req.user.isMgt ||
      req.user.isAdmin ||
      req.user.isDeskOfficer
    ) {
      next();
    } else {
      res
        .status(403)
        .json(
          "You are not authorised!!!. Please contact TVSTD Databank Desk Office for More Information"
        );
    }
  });
};

const verifyTokenAndMgt = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isMgt || req.user.isAdmin || req.user.isDeskOfficer) {
      next();
    } else {
      res
        .status(403)
        .json(
          "You are not authorised!!!. Please contact TVSTD Databank Desk Office for More Information"
        );
    }
  });
};

const verifyTokenAndDeskOfficer = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isDeskOfficer || req.user.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .json(
          "You are not authorised!!!. Please contact TVSTD Databank Desk Office for More Information"
        );
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .json(
          "You are not authorised!!!. Please contact TVSTD Databank Desk Office for More Information"
        );
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndMgt,
  verifyTokenAndDeskOfficer,
  verifyTokenAndAO,
};

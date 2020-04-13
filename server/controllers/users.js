const User = require("../models/user");
const { normalizeErrors } = require("../helpers/mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports.auth = function(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({
      errors: [
        {
          title: "Missing User Data",
          detail: "Provide Email and Password"
        }
      ]
    });
  }

  User.findOne({ email }, function(error, existingUser) {
    if (error) {
      return res.status(422).send({
        errors: normalizeErrors(error.errors)
      });
    }

    if (!existingUser) {
      return res.status(422).send({
        errors: [
          {
            title: "Wrong Data",
            detail: "Wrong email or password"
          }
        ]
      });
    }

    if (existingUser.isSamePassword(password)) {
      const token = jwt.sign(
        {
          userId: existingUser.id,
          username: existingUser.username
        },
        config.SECRET,
        { expiresIn: "1h" }
      );

      res.json(token);
    } else {
      return res.status(422).send({
        errors: [
          {
            title: "Wrong Data",
            detail: "Wrong email or password"
          }
        ]
      });
    }
  });
};

module.exports.register = function(req, res) {

  console.log(req.body)
  const { username, email, password, passwordConfirmed } = req.body;

  if (!email || !password) {
    return res.status(422).send({
      errors: [
        {
          title: "Missing User Data",
          detail: "Provide Email and Password"
        }
      ]
    });
  }

  if (password !== passwordConfirmed) {
    return res.status(422).send({
      errors: [
        {
          title: "Password Error",
          detail: "Password and PasswordConfirmed must be identical"
        }
      ]
    });
  }

  User.findOne({ email }, function(error, existingUser) {
    if (error) {
      return res.status(422).send({
        errors: normalizeErrors(error.errors)
      });
    }

    if (existingUser) {
      return res.status(409).send({
        errors: [
          {
            title: "Conflict Data",
            detail: "User Already exist"
          }
        ]
      });
    }

    const user = new User({
      username,
      email,
      password
    });

    user.save(function(error) {
      if (error) {
        return res.status(500).send({ errors: normalizeErrors(error.errors) });
      }
      return res.json({ registred: true });
    });
  });
};

module.exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization;

  if (token && token.split(" ").length > 1) {
    jwt.verify(token.split(" ")[1], config.SECRET, function(err, decoded) {
      if (err) {
        return notAuthorized(res);
      }
      User.findById(decoded.userId, function(err, existingUser) {
        if (err) {
          return notAuthorized(res);
        }
        if (existingUser) {
          res.locals.user = existingUser;
          next();
        }
      });
    });
  } else {
    return notAuthorized(res);
  }
};

function notAuthorized(res){
  return res.status(401).send({
    errors: [
      {
        title: "Unauthorized",
        detail: "Login to get access"
      }
    ]
  });
}

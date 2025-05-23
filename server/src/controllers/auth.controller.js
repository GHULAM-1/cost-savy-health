const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { validationResult } = require("express-validator");
dotenv.config();

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
    });

    await user.save();

    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ success: true, data: {} });
};

// exports.googleCallback = (req, res) => {

//   // Create token
//   const token = req.user.getSignedJwtToken();

//   const frontendURL = process.env.FRONTEND_URL;

//   const cookieOptions = {
//     expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
//     httpOnly: true,
//     sameSite: 'lax',
//     path: '/'
//   };

//   if (process.env.NODE_ENV === 'production') {
//     cookieOptions.secure = true;
//   }

//   res.cookie('token', token, cookieOptions);

//   res.cookie('auth_token', token, {
//     ...cookieOptions,
//     httpOnly: false
//   });

//   const userData = {
//     id: req.user._id,
//     name: req.user.name,
//     email: req.user.email,
//     role: req.user.role,
//     avatar: req.user.avatar
//   };

//   res.cookie('auth_user', JSON.stringify(userData), {
//     ...cookieOptions,
//     httpOnly: false
//   });

//   res.redirect(frontendURL);
// };

exports.googleCallback = async (req, res) => {
  try {gi
    console.log("Google callback started");
    
    // Create token
    const token = req.user.getSignedJwtToken();
    
    // Determine proper frontend URL
    const frontendURL = process.env.FRONTEND_URL;
    console.log("Frontend URL:", frontendURL);
    
    // Set cookie options based on environment
    const cookieOptions = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      path: '/'
    };

    // Check if we're in a production environment
    const isProduction = process.env.NODE_ENV === 'production';
    if (isProduction) {
      cookieOptions.secure = true;
      cookieOptions.sameSite = 'none';
      
      // Only set domain in production
      if (process.env.COOKIE_DOMAIN) {
        cookieOptions.domain = process.env.COOKIE_DOMAIN;
      }
    }
    
    console.log("Cookie options:", cookieOptions);
    
    // Set cookies
    res.cookie('token', token, cookieOptions);
    res.cookie('auth_token', token, {...cookieOptions, httpOnly: false});
    
    // Create minimal user data object
    const userData = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      avatar: req.user.avatar
    };
    
    res.cookie('auth_user', JSON.stringify(userData), {...cookieOptions, httpOnly: false});
    
    // Redirect to frontend
    console.log("Redirecting to:", frontendURL);
    return res.redirect(frontendURL);
  } catch (error) {
    console.error("Error in Google callback:", error);
    // Fallback to frontend with error parameter
    const errorRedirect = process.env.FRONTEND_URL || 'https://www.costsavvy.health';
    return res.redirect(`${errorRedirect}?auth_error=true`);
  }
};
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  let expiresIn = 90;
  if (process.env.JWT_EXPIRES_IN) {
    if (process.env.JWT_EXPIRES_IN.endsWith("d")) {
      expiresIn = parseInt(process.env.JWT_EXPIRES_IN);
    } else {
      expiresIn = 90;
    }
  }

  const options = {
    expires: new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
};

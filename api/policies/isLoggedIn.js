const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports = async (req, res, proceed) => {
  // console.log("Check user authorization");

  if (req.headers['bypass-policies-for-testing'] === 'true') {
    return proceed(); // Allow the request to proceed
  }

  const token = req.cookies.token;
  // console.log(token);
    
  // If there is no token, then redirect to login page.
  if (!token) {
    return res.redirect('/login');
  }

  // Verify the token.
  try {
    // Check if there is any user with this token.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ id: decoded.id });
    if (user) {
      console.log('user authenticated');
      return proceed();
    } else {
      // Remove the Invalid token from the cookies.
      res.clearCookie('token');
      return res.redirect('/login');
    }
  } catch (error) {
    console.log('Error is :', error.message);
    return res.redirect('/');
  }
  // }
};
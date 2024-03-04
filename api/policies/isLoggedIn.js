const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const registerRoutes = sails.config.constants.registerRoutes;

module.exports = async (req, res, proceed) => {
    console.log("Check user authorization");

    const token = req.cookies.token;
    console.log(token);

    // If the user try to access login page and is already authenticated, redirect to chats page.
    // if (token && registerRoutes.includes(req.url)) {
    //     return res.redirect("/chats");
    // }
    // // if the user is not authenticated and try to access login page, let him proceed with it.
    // else if (!token && registerRoutes.includes(req.url)) {
    //     proceed();
    // }
    // All the other routes need to be authenticated
    // else {
        // If there is no token, then redirect to login page.
        if (!token) {
            return res.redirect("/login");
        }

        // Verify the token.
        try {
            // Check if there is any user with this token.
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findOne({ id: decoded.id });
            if (user) {
                console.log('user authenticated');
                proceed();
            } else {
                // Remove the Invalid token from the cookies.
                res.clearCookie("token");
                return res.redirect("/login");
            }
        } catch (error) {
            console.log("Error is :", error.message);
            return res.redirect("/");
        }
    // }
};
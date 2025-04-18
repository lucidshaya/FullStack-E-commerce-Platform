const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Middleware to protect routes by verifying JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const protect = async (req, res, next) => {
    let token;

    // 1) Check for token in authorization header
    if (req.headers.authorization?.startsWith("Bearer")) {
        try {
            // 2) Extract token from header
            token = req.headers.authorization.split(" ")[1];

            // 3) Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4) Get user from database (without password)
            req.user = await User.findById(decoded.id).select("-password -__v");
            
            if (!req.user) {
                return res.status(401).json({
                    status: 'fail',
                    message: "The user belonging to this token no longer exists"
                });
            }

            // 5) Check if user changed password after token was issued
            if (req.user.changedPasswordAfter(decoded.iat)) {
                return res.status(401).json({
                    status: 'fail',
                    message: "Password was recently changed. Please log in again."
                });
            }

            // 6) Proceed to next middleware
            return next();
        } catch (error) {
            // Handle specific JWT errors
            let message = "Invalid token";
            if (error.name === 'TokenExpiredError') {
                message = "Token expired. Please log in again.";
            } else if (error.name === 'JsonWebTokenError') {
                message = "Invalid token. Please log in again.";
            }

            console.error("Authentication error:", error.message);
            return res.status(401).json({
                status: 'fail',
                message
            });
        }
    }

    return res.status(401).json({
        status: 'fail',
        message: "Please log in to access this resource"
    });
};

module.exports = { protect };
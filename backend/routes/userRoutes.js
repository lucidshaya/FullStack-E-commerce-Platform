const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { protect } = require ("../middleware/authMiddleware");
const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
    try {
        // 1) Check if password and passwordConfirm exist
        if (!req.body.password || !req.body.passwordConfirm) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide both password and password confirmation'
            });
        }

        // 2) Check if passwords match
        if (req.body.password !== req.body.passwordConfirm) {
            return res.status(400).json({
                status: 'fail',
                message: 'Passwords do not match'
            });
        }

        // 3) Create new user
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });

        // 4) Remove sensitive data from user object
        const user = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            createdAt: newUser.createdAt
        };

        // 5) Create JWT token
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
        );

        // 6) Send response with token and user data
        res.status(201).json({
            status: 'success',
            token,
            data: {
                user
            }
        });

    } catch (err) {
        // Handle validation errors
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                status: 'fail',
                message: messages.join(', ')
            });
        }
        
        // Handle duplicate email error
        if (err.code === 11000) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email already exists'
            });
        }
        
        // Handle other errors
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        });
    }
});

// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1) Check if email and password exist
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password'
            });
        }

        // 2) Find user by email and select password
        const user = await User.findOne({ email }).select('+password');
        
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Incorrect email or password'
            });
        }

        // 3) Remove sensitive data from user object
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        };

        // 4) Create JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
        );

        // 5) Send response with token and user data
        res.status(200).json({
            status: 'success',
            token,
            data: {
                user: userData
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        });
    }
});
// route GET /api/users/profile 
// @desc Get logged-in users profile (protected Route)
router.get("/profile", protect, async (req, res) => {
    try {
        // The user is already attached to req by the protect middleware
        const user = req.user;
        
        // Format the response data (remove sensitive/unnecessary fields)
        const userProfile = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        };

        res.status(200).json({
            status: 'success',
            data: {
                user: userProfile
            }
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({
            status: 'error',
            message: 'Server error while fetching profile'
        });
    }
});

module.exports = router;
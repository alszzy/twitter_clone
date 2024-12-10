import { generateTokenAndCookie } from "../lib/utils/generateTokenAndCookie.js ";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
     try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        // Check if user is already registered
        const existingUser = await User.findOne({ username })

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Validate email
        // Extension: validate if the email exists by sending a verification email
        const emialRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emialRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }

        // Check if email is already registered
        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Validate password
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Hash password
        const hashedPassword = await hashPassword(password)

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save user to database
        if (!newUser) {
            return res.status(400).json({ message: "User not created" });
        }
        generateTokenAndCookie(newUser._id, res);
        await newUser.save();
        return res.status(201).json({ message: "User created successfully" });
     } catch (error) {
        return res.status(500).json({ message: error.message });
     }
}
const hashPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword
}
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user?.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateTokenAndCookie(user._id, res);
        return res.status(200).json({ message: "Login successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        return res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } 
}

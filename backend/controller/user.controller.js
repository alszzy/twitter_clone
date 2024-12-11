import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { hashPassword } from '../lib/utils/hashPassword.js';
import { v2 as cloudinary } from 'cloudinary';

export const getUserProfile = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username }).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUserProfile = async (req, res) => {
    const { username, email, currentPassword, newPassword, bio } = req.body;
    let {coverImg, profileImg} = req.body
    let  userId = req.user._id;
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
            return res.status(400).json({ message: "Please provide current password and new password" });
        }

        if (newPassword && currentPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Your password is incorrect!" });
            }
            if (newPassword < 6) {  
                return res.status(400).json({ message: "Password must be at least 6 characters" });
            } 
            const hashedPassword = await hashPassword(newPassword);
            user.password = hashedPassword;

        }

        if (profileImg){
            if (user.profileImg){
                await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0])
            const uploadedProfileImg = await cloudinary.uploader.upload(profileImg);
            profileImg = uploadedProfileImg.secure_url;
            }
        }
        if (coverImg){
            if (user.coverImg){
                await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0])
            const uploadedProfileImg = await cloudinary.uploader.upload(coverImg);
            coverImg = uploadedProfileImg.secure_url;
            }
        }
        user.email = email || user.email;
        user.bio = bio || user.bio;
        user.profileImg = profileImg || user.profileImg;
        user.coverImg = coverImg || user.coverImg;
        user.username = username || user.username;

        await user.save();
        user.password = undefined;
        return res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        // Handle the error here
        return res.status(500).json({ message: error.message });
    }
}

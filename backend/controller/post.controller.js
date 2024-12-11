import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import {v2 as  cloudinary} from "cloudinary";
 
export const createPost = async (req, res) => {
    try {
        const {text } = req.body;
        let { image } = req.body;
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!text && !image)
            return res.status(400).json({ message: "Please provide text or image" });
        if (image) {
            const uploadedImage = await cloudinary.uploader.upload(image);
            image = uploadedImage.secure_url;
        }
        const newPost = new Post({
            user: userId,
            text,
            image 
        });
        await newPost.save();
        res.status(201).json({ message: "Post created successfully", newPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        const userId = req.user._id;
        if (post.user.toString() !== userId.toString()) {
            return res.status(401).json({ message: "You are not authorized to delete this post" });
        }
        if (post.image) {
            await cloudinary.uploader.destroy(post.image.split("/").pop().split(".")[0]);
        }
        await Post.findByIdAndDelete(id); 
        res.status(200).json({ message: "Post deleted successfully", post });
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}
export const createComment = async (req, res) => {
    try {
        const { text } = req.body;
        const userId = req.user._id;
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) {
            console.log("Post not found")
            return res.status(404).json({ message: "Post not found" });
        }
        if (!text) {
            console.log("Please provide text")
            return res.status(400).json({ message: "Please provide text" });
        }
        post.comments.unshift({ text, user: userId }); 
        await post.save();
        res.status(201).json({ message: "Comment created successfully", post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate({
            path: "user",
            select: "-password"
        }).populate({
            path: "comments.user",
            select: "-password"
        });
        if (!posts) {
            return res.status(200).json([]);
        }
        res.status(200).json({ posts }); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
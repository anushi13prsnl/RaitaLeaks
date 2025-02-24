import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
    commentOnPost,
    deletePost,
    getAllPosts,
    getFollowingPosts,
    getLikedPosts,
    getUserPosts,
    likeUnlikePost,
} from "../controllers/post.controller.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import Post from "../models/post.model.js"; // Assuming you have a Post model

const router = express.Router();
const upload = multer({
    dest: "uploads/",
    limits: { fileSize: 10 * 1024 * 1024 }, // Increase file size limit to 10MB
}); // Temporary storage for uploaded files

router.get("/all", protectRoute, getAllPosts);
router.get("/following", protectRoute, getFollowingPosts);
router.get("/likes/:id", protectRoute, getLikedPosts);
router.get("/user/:username", protectRoute, getUserPosts);
router.post("/create", protectRoute, upload.single("image"), async (req, res) => {
    try {
        const { text } = req.body;
        let imageUrl = "";

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        const newPost = new Post({
            user: req.user._id, // Assuming req.user contains the authenticated user's info
            text,
            img: imageUrl,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);
router.delete("/:id", protectRoute, deletePost);

export default router;
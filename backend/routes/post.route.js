import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { 
    commentOnPost, 
    createPost, 
    deletePost, 
    getAllPosts, 
    getFollowingPosts, 
    getLikedPosts, 
    getUserPosts, 
    likeUnlikePost 
} 
from '../controllers/post.controller.js';

const router = express.Router();

router.get("/all", protectRoute, getAllPosts)

router.post("/create", protectRoute, createPost);
router.get("/likes/:id", protectRoute, getLikedPosts);
router.get("/following", protectRoute, getFollowingPosts);
router.get("/user/:username", protectRoute, getUserPosts);
router.post("/like/:id", protectRoute, likeUnlikePost)
router.post("/comment/:id", protectRoute, commentOnPost)
 router.delete("/:id", protectRoute, deletePost)

export default router;
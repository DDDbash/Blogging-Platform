import express from "express";
import {
  createPost,
  deletePost,
  getPostDetails,
  getPosts,
  updatePost,
} from "../controllers/post";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/", getPosts);
router.get("/:postId", getPostDetails);
router.get("/auth/:postId", auth, getPostDetails);
router.post("/", auth, createPost);
router.patch("/:postId", auth, updatePost);
router.delete("/:postId", auth, deletePost);

export default router;

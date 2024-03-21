import express from "express";

import auth from "../middleware/auth";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/comment";

const router = express.Router();

router.get("/:postId", getComments);
router.post("/:postId", auth, createComment);
router.patch("/:commentId", auth, updateComment);
router.delete("/:commentId", auth, deleteComment);

export default router;

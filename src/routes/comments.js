const express = require("express");
const {
  getCommentsForPost,
  createComment,
  deleteComment
} = require("../controllers/commentController");
const { authenticateJWT, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/post/:postId", getCommentsForPost);
router.post("/post/:postId", createComment);
router.delete("/:id", authenticateJWT, requireAdmin, deleteComment);

module.exports = router;

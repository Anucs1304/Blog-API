const express = require("express");
const {
  getPublicPosts,
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  togglePublish,
  deletePost
} = require("../controllers/postController");
const { authenticateJWT, requireAdmin } = require("../middleware/auth.js");

const router = express.Router();

router.get("/", getPublicPosts);
router.get("/:id", getPostById);

router.get("/admin/all", authenticateJWT, requireAdmin, getAllPosts);
router.post("/", authenticateJWT, requireAdmin, createPost);
router.put("/:id", authenticateJWT, requireAdmin, updatePost);
router.patch("/:id/publish", authenticateJWT, requireAdmin, togglePublish);
router.delete("/:id", authenticateJWT, requireAdmin, deletePost);

module.exports = router;

const prisma = require("../prisma");

async function getPublicPosts(req, res) {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: { author: { select: { id: true, username: true } } }
    });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await prisma.post.findMany({
      include: { author: { select: { id: true, username: true } } }
    });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
}

async function getPostById(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: { select: { id: true, username: true } }, comments: true }
    });
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (!post.published && (!req.user || req.user.role !== "ADMIN")) {
      return res.status(403).json({ message: "Not authorized to view this post" });
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch post" });
  }
}

async function createPost(req, res) {
  try {
    const { title, content, published } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: !!published,
        authorId: req.user.id
      }
    });
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create post" });
  }
}

async function updatePost(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, content } = req.body;

    const post = await prisma.post.update({
      where: { id },
      data: { title, content }
    });

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update post" });
  }
}

async function togglePublish(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return res.status(404).json({ message: "Post not found" });

    const updated = await prisma.post.update({
      where: { id },
      data: { published: !post.published }
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to toggle publish" });
  }
}

async function deletePost(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.comment.deleteMany({ where: { postId: id } });
    await prisma.post.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
}

module.exports = {
  getPublicPosts,
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  togglePublish,
  deletePost
};

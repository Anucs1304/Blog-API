const prisma = require("../prisma");

async function getCommentsForPost(req, res) {
  try {
    const postId = parseInt(req.params.postId, 10);
    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: "desc" }
    });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
}

async function createComment(req, res) {
  try {
    const postId = parseInt(req.params.postId, 10);
    const { content, username, email } = req.body;

    const comment = await prisma.comment.create({
      data: {
        content,
        username: username || null,
        email: email || null,
        postId
      }
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create comment" });
  }
}

async function deleteComment(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.comment.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete comment" });
  }
}

module.exports = { getCommentsForPost, createComment, deleteComment };

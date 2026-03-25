const API_URL = "http://localhost:3000";

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

async function loadPost() {
  const res = await fetch(`${API_URL}/posts/${postId}`);
  const post = await res.json();

  document.getElementById("post-title").textContent = post.title;
  document.getElementById("post-content").textContent = post.content;
}

async function loadComments() {
  const res = await fetch(`${API_URL}/comments/post/${postId}`);
  const comments = await res.json();

  const container = document.getElementById("comments");
  container.innerHTML = "";

  comments.forEach(c => {
    const div = document.createElement("div");
    div.className = "comment";
    div.innerHTML = `
      <strong>${c.username || "Anonymous"}</strong>
      <p>${c.content}</p>
    `;
    container.appendChild(div);
  });
}

document.getElementById("comment-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const content = document.getElementById("content").value;

  await fetch(`${API_URL}/comments/post/${postId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, content })
  });

  document.getElementById("content").value = "";
  loadComments();
});

loadPost();
loadComments();

const API_URL = "http://localhost:3000";

async function loadPosts() {
  const container = document.getElementById("posts-container");

  const res = await fetch(`${API_URL}/posts`);
  const posts = await res.json();

  container.innerHTML = "";

  posts.forEach(post => {
    const card = document.createElement("div");
    card.className = "post-card";

    card.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content.substring(0, 120)}...</p>
      <a href="post.html?id=${post.id}">Read more</a>
    `;

    container.appendChild(card);
  });
}

loadPosts();

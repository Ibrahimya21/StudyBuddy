
let resources = [];

const resourcesList = document.getElementById("resources-list");
const resourcesStatus = document.getElementById("resources-status");
const resourceSearch = document.getElementById("resource-search");
const resourceCategory = document.getElementById("resource-category");

async function loadResources() {
  try {
    resourcesStatus.textContent = "Loading...";
    const res = await fetch("../resources.json");
    if (!res.ok) throw new Error("Failed to load resources");
    resources = await res.json();
    resourcesStatus.textContent = "";
    renderResources();
  } catch (err) {
    resourcesStatus.textContent = "Error loading resources";
  }
}

function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function renderResources() {
  resourcesList.innerHTML = "";

  let filtered = [...resources];

  const search = resourceSearch.value.toLowerCase();
  const category = resourceCategory.value;

  if (search) {
    filtered = filtered.filter((r) => r.title.toLowerCase().includes(search));
  }

  if (category !== "all") {
    filtered = filtered.filter((r) => r.category === category);
  }

  filtered.forEach((r) => {
    const card = document.createElement("div");
    card.className = "resource-card";

    const isFav = favorites.includes(r.id);

    card.innerHTML = `
      <span class="star ${isFav ? "active" : ""}" data-id="${r.id}">★</span>
      <h4>${r.title}</h4>
      <p>${r.description}</p>
      <small>${r.category}</small><br />
      <a href="${r.link}" target="_blank">Open</a>
    `;

    resourcesList.appendChild(card);
  });
}

resourcesList.addEventListener("click", (e) => {
  if (!e.target.classList.contains("star")) return;

  const id = Number(e.target.dataset.id);

  if (favorites.includes(id)) {
    favorites = favorites.filter((f) => f !== id);
  } else {
    favorites.push(id);
  }

  saveFavorites();
  renderResources();
});

resourceSearch.addEventListener("input", renderResources);
resourceCategory.addEventListener("change", renderResources);

loadResources();

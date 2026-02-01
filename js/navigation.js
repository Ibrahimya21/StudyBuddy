const links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");

function showSection(id) {
  sections.forEach((sec) => sec.classList.toggle("active", sec.id === id));

  links.forEach((link) =>
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`),
  );
}
location.hash = "dashboard";
showSection("dashboard");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = link.getAttribute("href").substring(1);
    location.hash = id;
    showSection(id);
  });
});

window.addEventListener("hashchange", () => {
  showSection(location.hash.replace("#", "") || "dashboard");
});

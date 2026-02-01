const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.checked = true;
}

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light",
  );
});

document.getElementById("reset-data").addEventListener("click", () => {
  if (!confirm("Are you sure you want to reset all data?")) return;

  localStorage.removeItem("tasks");
  location.reload();
});

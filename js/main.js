document.addEventListener("DOMContentLoaded", () => {
  if (typeof renderTasks === "function") renderTasks();
  if (typeof renderDashboard === "function") renderDashboard();
  if (typeof renderHabits === "function") renderHabits();
  if (typeof loadResources === "function") loadResources();
});

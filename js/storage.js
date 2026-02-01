function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

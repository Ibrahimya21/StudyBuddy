const dueSoonEl = document.getElementById("due-soon");
const completedCountEl = document.getElementById("completed-count");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");
const todayTasksEl = document.getElementById("today-tasks");
const habitStreakEl = document.getElementById("habit-streak");

function renderDashboard() {
  if (!completedCountEl) return;

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

  completedCountEl.textContent = completed;
  const progress = total ? Math.round((completed / total) * 100) : 0;
  progressFill.style.width = progress + "%";
  progressText.textContent = progress + "%";

  const today = new Date();
  const inTwoDays = new Date(today);
  inTwoDays.setDate(today.getDate() + 2);

  const dueSoon = tasks.filter((t) => {
    const d = new Date(t.dueDate);
    return d >= today && d <= inTwoDays && !t.completed;
  });

  dueSoonEl.textContent = dueSoon.length;
  todayTasksEl.innerHTML = "";
  dueSoon.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = `${t.title} (${t.dueDate})`;
    todayTasksEl.appendChild(li);
  });

    if (typeof habits !== "undefined" && habitStreakEl) {
      const totalHabits = habits.length;

      const achievedHabits = habits.filter((habit) => {
        const doneDays = habit.progress.filter(Boolean).length;
        return doneDays >= habit.goal;
      }).length;

      habitStreakEl.textContent = `${achievedHabits} / ${totalHabits}`;
    }
}

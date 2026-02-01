document.addEventListener("DOMContentLoaded", () => {
  const habitForm = document.getElementById("habit-form");
  const habitsList = document.getElementById("habits-list");
  const habitsSummary = document.getElementById("habits-summary");
  const habitNameInput = document.getElementById("habit-name");
  const habitGoalSelect = document.getElementById("habit-goal");

  if (
    !habitForm ||
    !habitsList ||
    !habitsSummary ||
    !habitNameInput ||
    !habitGoalSelect
  ) {
    return;
  }

  const daysLabels = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  if (typeof habits === "undefined") {
    window.habits = JSON.parse(localStorage.getItem("habits")) || [];
  }

  if (typeof saveHabits !== "function") {
    window.saveHabits = function () {
      localStorage.setItem("habits", JSON.stringify(habits));
    };
  }

  window.renderHabits = function renderHabits() {
    habitsList.innerHTML = "";

    let achieved = 0;

    habits.forEach((habit) => {
      const progressCount = habit.progress.filter(Boolean).length;
      if (progressCount >= habit.goal) achieved++;

      const card = document.createElement("div");
      card.className = "habit-card";

      card.innerHTML = `
        <h4>${habit.name}</h4>
        <p>Goal: ${habit.goal} days</p>

        <div class="days">
          ${daysLabels
            .map((label, i) => {
              const isActive = habit.progress[i] ? "active" : "";
              return `
                <div class="day ${isActive}"
                    role="button"
                    tabindex="0"
                    data-habit="${habit.id}"
                    data-day="${i}">
                  ${label}
                </div>
              `;
            })
            .join("")}
        </div>

        <p>${progressCount} / ${habit.goal}</p>
      `;

      habitsList.appendChild(card);
    });

    habitsSummary.textContent = `${achieved} / ${habits.length} goals achieved`;
  };

  habitForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = habitNameInput.value.trim();
    const goal = Number(habitGoalSelect.value);

    if (!name) return;

    const newHabit = {
      id: Date.now(),
      name,
      goal,
      progress: [false, false, false, false, false, false, false],
    };

    habits.push(newHabit);
    saveHabits();
    renderHabits();
    if (typeof renderDashboard === "function") renderDashboard();
    habitForm.reset();
  });

  habitsList.addEventListener("click", (e) => {
    const dayEl = e.target.closest(".day");
    if (!dayEl) return;

    const habitId = Number(dayEl.dataset.habit);
    const dayIndex = Number(dayEl.dataset.day);

    const habit = habits.find((h) => h.id === habitId);
    if (!habit) return;

    const currentlyOn = habit.progress[dayIndex] === true;

    const selectedCount = habit.progress.filter(Boolean).length;
    if (currentlyOn) {
      habit.progress[dayIndex] = false;
      saveHabits();
      renderHabits();
      if (typeof renderDashboard === "function") renderDashboard();
      return;
    }

    if (selectedCount >= habit.goal) {
      alert(`You can only select ${habit.goal} day(s) for this habit.`);
      return;
    }

    habit.progress[dayIndex] = true;

    saveHabits();
    renderHabits();
    if (typeof renderDashboard === "function") renderDashboard();
  });

  habitsList.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const dayEl = e.target.closest(".day");
    if (!dayEl) return;
    dayEl.click();
  });

  renderHabits();
});

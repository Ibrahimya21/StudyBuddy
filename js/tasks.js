document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");
  const filterStatus = document.getElementById("filterStatus");
  const filterCategory = document.getElementById("filterCategory");
  const sortBy = document.getElementById("sortBy");

  const titleEl = document.getElementById("title");
  const descriptionEl = document.getElementById("description");
  const dueDateEl = document.getElementById("dueDate");
  const priorityEl = document.getElementById("priority");
  const categoryEl = document.getElementById("category");

  let editingTaskId = null;

  if (
    !taskForm ||
    !taskList ||
    !filterStatus ||
    !sortBy ||
    !titleEl ||
    !dueDateEl ||
    !priorityEl ||
    !categoryEl
  ) {
    return;
  }

  function safeText(v) {
    return (v ?? "").toString();
  }

  function populateCategoryFilter() {
    if (!filterCategory) return;

    const cats = [
      ...new Set(tasks.map((t) => (t.category || "").trim()).filter(Boolean)),
    ].sort();

    filterCategory.innerHTML =
      `<option value="all">All Categories</option>` +
      cats.map((c) => `<option value="${c}">${c}</option>`).join("");
  }

  function renderTasks() {
    taskList.innerHTML = "";

    let filtered = [...tasks];

    if (filterStatus.value === "active")
      filtered = filtered.filter((t) => !t.completed);
    if (filterStatus.value === "completed")
      filtered = filtered.filter((t) => t.completed);

    if (filterCategory && filterCategory.value !== "all") {
      filtered = filtered.filter(
        (t) => (t.category || "").trim() === filterCategory.value,
      );
    }

    if (sortBy.value === "date") {
      filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else {
      const order = { High: 1, Medium: 2, Low: 3 };
      filtered.sort(
        (a, b) => (order[a.priority] || 99) - (order[b.priority] || 99),
      );
    }

    filtered.forEach((task) => {
      const li = document.createElement("li");
      li.className = `task ${task.completed ? "completed" : ""}`;

      li.innerHTML = `
        <div class="task-info">
          <strong>${safeText(task.title)}</strong>
          <div class="task-meta">
            <small>
              ${safeText(task.dueDate)} | ${safeText(task.priority)} | ${safeText(task.category || "—")}
            </small>
          </div>
          ${task.description ? `<div class="task-desc"><small>${safeText(task.description)}</small></div>` : ""}
        </div>

        <div class="task-actions">
          <button data-action="toggle" data-id="${task.id}" aria-label="Toggle complete">✓</button>
          <button data-action="edit" data-id="${task.id}" aria-label="Edit task">✎</button>
          <button data-action="delete" data-id="${task.id}" aria-label="Delete task">🗑</button>
        </div>
      `;

      taskList.appendChild(li);
    });

    if (typeof renderDashboard === "function") renderDashboard();
  }

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleEl.value.trim();
    const description = descriptionEl ? descriptionEl.value.trim() : "";
    const dueDate = dueDateEl.value;
    const priority = priorityEl.value;
    const category = categoryEl.value.trim();

    if (!title || !dueDate) {
      alert("Title and Due Date are required");
      return;
    }

    const newTask = {
      id: editingTaskId ?? Date.now(),
      title,
      description,
      dueDate,
      priority,
      category,
      completed: false,
    };

    if (editingTaskId) {
      
      const old = tasks.find((t) => t.id === editingTaskId);
      if (old) newTask.completed = old.completed;

      tasks = tasks.map((t) => (t.id === editingTaskId ? newTask : t));
      editingTaskId = null;

      taskForm.querySelector("button[type='submit']").textContent = "Add Task";
    } else {
      tasks.push(newTask);
    }

    saveTasks();
    populateCategoryFilter();
    renderTasks();
    taskForm.reset();
  });

  taskList.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const id = Number(btn.dataset.id);
    const action = btn.dataset.action;

    if (!id || !action) return;

    if (action === "toggle") {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;
      task.completed = !task.completed;
    }

    if (action === "edit") {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      titleEl.value = task.title;
      if (descriptionEl) descriptionEl.value = task.description || "";
      dueDateEl.value = task.dueDate;
      priorityEl.value = task.priority;
      categoryEl.value = task.category || "";

      editingTaskId = id;
      taskForm.querySelector("button[type='submit']").textContent = "Save";
      return; 
    }

    if (action === "delete") {
      if (!confirm("Delete this task?")) return;
      tasks = tasks.filter((t) => t.id !== id);
    }

    saveTasks();
    populateCategoryFilter();
    renderTasks();
  });

  filterStatus.addEventListener("change", renderTasks);
  sortBy.addEventListener("change", renderTasks);
  if (filterCategory) filterCategory.addEventListener("change", renderTasks);

  populateCategoryFilter();
  renderTasks();
});

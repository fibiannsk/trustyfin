const STORAGE_KEY = "todo-app-tasks";
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const stats = document.getElementById("todo-stats");
const emptyState = document.getElementById("empty-state");

// Load todos
let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

// Render icons
lucide.createIcons();

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = "";
  if (todos.length === 0) {
    emptyState.style.display = "block";
    stats.textContent = "";
    return;
  }
  emptyState.style.display = "none";

  const completedCount = todos.filter(t => t.completed).length;
  stats.textContent = `${todos.length} task${todos.length !== 1 ? "s" : ""} • ${completedCount} completed`;

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.completed ? " completed" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.className = "text";

    const btn = document.createElement("button");
    btn.innerHTML = `<i data-lucide="trash-2"></i>`;
    btn.addEventListener("click", () => deleteTodo(todo.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  });

  // Re-render Lucide icons
  lucide.createIcons();
}

function addTodo(text) {
  const newTodo = {
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: new Date().toISOString()
  };
  todos.unshift(newTodo);
  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  renderTodos();
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const value = input.value.trim();
  if (value) {
    addTodo(value);
    input.value = "";
  }
});

renderTodos();

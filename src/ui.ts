import type { TaskService } from "./task-service.js";

export function mountUI(root: HTMLElement, service: TaskService): void {
  root.innerHTML = "";

  const form = document.createElement("form");
  form.dataset.testid = "task-form";

  const input = document.createElement("input");
  input.type = "text";
  input.required = true;
  input.placeholder = "Что сделать?";
  input.dataset.testid = "task-input";

  const addButton = document.createElement("button");
  addButton.type = "submit";
  addButton.textContent = "Добавить";
  addButton.dataset.testid = "task-add";

  form.appendChild(input);
  form.appendChild(addButton);
  root.appendChild(form);

  const list = document.createElement("ul");
  list.dataset.testid = "task-list";
  root.appendChild(list);

  const render = (): void => {
    list.innerHTML = "";
    for (const task of service.list()) {
      const item = document.createElement("li");
      item.dataset.testid = "task-item";
      item.dataset.taskId = task.id;

      const toggle = document.createElement("input");
      toggle.type = "checkbox";
      toggle.checked = task.done;
      toggle.dataset.testid = "task-toggle";
      toggle.addEventListener("change", () => {
        service.toggle(task.id);
        render();
      });

      const title = document.createElement("span");
      title.textContent = task.title;
      title.dataset.testid = "task-title";
      if (task.done) {
        title.style.textDecoration = "line-through";
      }

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.textContent = "✕";
      removeButton.dataset.testid = "task-remove";
      removeButton.addEventListener("click", () => {
        service.remove(task.id);
        render();
      });

      item.appendChild(toggle);
      item.appendChild(title);
      item.appendChild(removeButton);
      list.appendChild(item);
    }
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = input.value.trim();
    if (title.length === 0) return;
    service.create(title);
    input.value = "";
    render();
  });

  render();
}

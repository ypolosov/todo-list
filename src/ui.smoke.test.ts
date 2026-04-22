import { beforeEach, describe, expect, it } from "vitest";
import { TaskService } from "./task-service.js";
import { InMemoryTaskStore } from "./task-store.js";
import { mountUI } from "./ui.js";

describe("UI smoke", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("T8: user creates, toggles and removes a task", () => {
    const root = document.createElement("div");
    document.body.appendChild(root);
    const service = new TaskService(new InMemoryTaskStore());
    mountUI(root, service);

    const input = root.querySelector<HTMLInputElement>("[data-testid=task-input]");
    const addButton = root.querySelector<HTMLButtonElement>("[data-testid=task-add]");
    expect(input).not.toBeNull();
    expect(addButton).not.toBeNull();

    input!.value = "Demo task";
    addButton!.click();

    const items = root.querySelectorAll<HTMLLIElement>("[data-testid=task-item]");
    expect(items).toHaveLength(1);

    const toggle = items[0]!.querySelector<HTMLInputElement>("[data-testid=task-toggle]");
    toggle!.click();
    expect(toggle!.checked).toBe(true);

    const remove = items[0]!.querySelector<HTMLButtonElement>("[data-testid=task-remove]");
    remove!.click();

    const afterRemove = root.querySelectorAll("[data-testid=task-item]");
    expect(afterRemove).toHaveLength(0);
  });
});

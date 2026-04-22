import { beforeEach, describe, expect, it } from "vitest";
import type { Task, TaskStore } from "./task-store.js";
import { InMemoryTaskStore, LocalStorageTaskStore } from "./task-store.js";

function contractTests(name: string, factory: () => TaskStore): void {
  describe(`TaskStore contract: ${name}`, () => {
    let store: TaskStore;

    beforeEach(() => {
      localStorage.clear();
      store = factory();
    });

    it("load() returns an empty array when no data was saved", () => {
      expect(store.load()).toEqual([]);
    });

    it("save() then load() returns the same tasks", () => {
      const tasks: Task[] = [
        { id: "a", title: "one", done: false },
        { id: "b", title: "two", done: true },
      ];
      store.save(tasks);
      expect(store.load()).toEqual(tasks);
    });

    it("save() is idempotent for equal input", () => {
      const tasks: Task[] = [{ id: "a", title: "one", done: false }];
      store.save(tasks);
      store.save(tasks);
      expect(store.load()).toEqual(tasks);
    });
  });
}

contractTests("InMemoryTaskStore", () => new InMemoryTaskStore());
contractTests("LocalStorageTaskStore", () => new LocalStorageTaskStore("todo-list-test"));

import { beforeEach, describe, expect, it, vi } from "vitest";
import { TaskService } from "./task-service.js";
import { InMemoryTaskStore } from "./task-store.js";

describe("TaskService", () => {
  let store: InMemoryTaskStore;
  let service: TaskService;

  beforeEach(() => {
    store = new InMemoryTaskStore();
    service = new TaskService(store);
  });

  it("T1: create(title) adds a task and returns its id", () => {
    const id = service.create("Buy milk");
    const tasks = service.list();
    expect(tasks).toHaveLength(1);
    expect(tasks[0]?.id).toBe(id);
    expect(tasks[0]?.title).toBe("Buy milk");
  });

  it("T2: created task has done=false and a non-empty id", () => {
    const id = service.create("Write demo");
    const task = service.list()[0];
    expect(id).toBeTruthy();
    expect(typeof id).toBe("string");
    expect(task?.done).toBe(false);
  });

  it("T3: toggle(id) inverts the done flag", () => {
    const id = service.create("Run tests");
    service.toggle(id);
    expect(service.list()[0]?.done).toBe(true);
    service.toggle(id);
    expect(service.list()[0]?.done).toBe(false);
  });

  it("T4: remove(id) deletes the task from the list", () => {
    const idA = service.create("A");
    const idB = service.create("B");
    service.remove(idA);
    const remaining = service.list();
    expect(remaining).toHaveLength(1);
    expect(remaining[0]?.id).toBe(idB);
  });

  it("T5: list() reads from TaskStore.load()", () => {
    const spy = vi.spyOn(store, "load");
    service.list();
    expect(spy).toHaveBeenCalled();
  });

  it("T6: mutations call TaskStore.save() exactly once per mutation", () => {
    const spy = vi.spyOn(store, "save");
    const id = service.create("X");
    expect(spy).toHaveBeenCalledTimes(1);
    service.toggle(id);
    expect(spy).toHaveBeenCalledTimes(2);
    service.remove(id);
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it("T-extra: toggle/remove with unknown id is a no-op", () => {
    expect(() => service.toggle("missing")).not.toThrow();
    expect(() => service.remove("missing")).not.toThrow();
    expect(service.list()).toHaveLength(0);
  });

  it("T3b: toggle affects only the matching task among many", () => {
    const idA = service.create("A");
    const idB = service.create("B");
    service.toggle(idA);
    const tasks = service.list();
    const a = tasks.find((task) => task.id === idA);
    const b = tasks.find((task) => task.id === idB);
    expect(a?.done).toBe(true);
    expect(b?.done).toBe(false);
  });
});

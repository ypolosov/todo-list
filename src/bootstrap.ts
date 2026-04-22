import { TaskService } from "./task-service.js";
import { LocalStorageTaskStore } from "./task-store.js";
import { mountUI } from "./ui.js";

const rootElement = document.querySelector<HTMLElement>("#app");
if (rootElement === null) {
  throw new Error("Root element #app not found");
}

const store = new LocalStorageTaskStore();
const service = new TaskService(store);
mountUI(rootElement, service);

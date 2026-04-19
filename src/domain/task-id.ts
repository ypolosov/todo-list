export type TaskId = string & { readonly __brand: 'TaskId' };

export const createTaskId = (): TaskId => {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('') as TaskId;
};

export const isTaskId = (value: unknown): value is TaskId =>
  typeof value === 'string' && value.length > 0;

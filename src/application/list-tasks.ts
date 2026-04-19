import { Task } from '../domain/task';
import { TaskRepository } from './task-repository';

export const listTasks = async (repo: TaskRepository): Promise<Task[]> => repo.findAll();

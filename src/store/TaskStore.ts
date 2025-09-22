import { makeAutoObservable, observable } from "mobx";
import { Roles, TaskProps } from "../models";

class TaskStore {
  tasks: TaskProps[] = [];
  role: Roles = 'USER';

  constructor() {
    makeAutoObservable(this, {
      tasks: observable,
      // role: observable
    });
  }

  getTasks() {
    return this.tasks;
  }

  setTasks(tasks: TaskProps[]) {
    this.tasks = tasks;
  }

  addTask(task: TaskProps) {
    this.tasks.push(task);
  }

  setRole(role: Roles) {
    this.role = role;
  }

  getRole() {
    return this.role;
  }
}

export const taskStore = new TaskStore(); // Export an instance of the store
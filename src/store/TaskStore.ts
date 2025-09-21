import { makeAutoObservable, observable } from "mobx";
import { TaskProps } from "../models";

class TaskStore {
  tasks: TaskProps[] = [];

  constructor() {
    makeAutoObservable(this, {
      tasks: observable
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
}

export const taskStore = new TaskStore(); // Export an instance of the store
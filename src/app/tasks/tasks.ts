import { Component, Input } from '@angular/core';
import { Task } from './task/task';
import { NewTask } from './new-task/new-task';
import { type NewTaskData } from './task/task.model';
@Component({
  selector: 'app-tasks',
  imports: [Task, NewTask],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  @Input() name!: string;
  @Input() id!: string;
  isAddTask=false;
  tasks = [{
    id: 't1',
    userId: 'u1',
    title: 'Master Angular',
    summary:
      'Learn all the basic and advanced features of Angular & how to apply them.',
    dueDate: '2025-12-31',
  },
  {
    id: 't2',
    userId: 'u3',
    title: 'Build first prototype',
    summary: 'Build a first prototype of the online shop website',
    dueDate: '2024-05-31',
  },
  {
    id: 't3',
    userId: 'u3',
    title: 'Prepare issue template',
    summary:
      'Prepare and describe an issue template which will help with project management',
    dueDate: '2024-06-15',
  }]
  get selectedUserTasks() {
    return this.tasks.filter(task => task.userId === this.id);
  }
  onCompleteTask(id:string){
    // filter() returns a NEW array containing only elements that pass the test (where the callback returns true).
    // Syntax: array.filter((element) => condition)
    // Here we keep every task whose id does NOT match the completed task's id, effectively removing it.
    this.tasks=this.tasks.filter(task=>task.id!==id);
  }

  onStartAddTask(){
    this.isAddTask=true;
    console.log("Add task clicked");
  }
  
  onCancelAddTask(){
    this.isAddTask=false;
    console.log("Canceled add task");
  }
  
  onAddTask(taskData: NewTaskData){
    console.log("Task Added!", taskData);
    this.tasks.push({
      id: new Date().getTime().toString(),
      userId: this.id,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.dueDate
    })
    this.isAddTask=false;
  }
}

import { Component, Input } from '@angular/core';
import { Task } from './task/task';
import { NewTask } from './new-task/new-task';
import { TasksService } from './tasks.service';
@Component({

  selector: 'app-tasks',
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
  standalone: false
})
export class Tasks {
  @Input() name!: string;
  @Input() id!: string;
  isAddTask=false;
  constructor(private tasksService: TasksService){

  }
  
  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.id);
  }

  onStartAddTask(){
    this.isAddTask=true;
    console.log("Add task clicked");
  }
  
  onCloseAddTask(){
    this.isAddTask=false;
    console.log("Canceled add task");
  }
}

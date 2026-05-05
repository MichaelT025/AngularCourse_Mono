import { Component, Input, inject } from '@angular/core';
import { task_T } from './task.model';
import { TasksService } from '../tasks.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.html',
  styleUrl: './task.css',
  standalone: false
})
export class Task {
  @Input() task!: task_T;
  private tasksService = inject(TasksService);
  
  onCompleteTask(){
    this.tasksService.removeTask(this.task.id);
  }
}

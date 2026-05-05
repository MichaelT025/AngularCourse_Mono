import { Component, Input, inject } from '@angular/core';
import { task_T } from './task.model';
import { Card } from "../../shared/card/card";
import { DatePipe } from '@angular/common';
import { TasksService } from '../tasks.service';
@Component({
  selector: 'app-task',
  imports: [Card, DatePipe],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {
  @Input() task!: task_T;
  private tasksService = inject(TasksService);
  
  onCompleteTask(){
    this.tasksService.removeTask(this.task.id);
  }
}

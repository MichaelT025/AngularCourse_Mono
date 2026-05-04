import { Component, Input, Output, EventEmitter } from '@angular/core';
import { task_T } from './task.model';
@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {
  @Input() task!: task_T;
  @Output() complete = new EventEmitter<string>();
  onCompleteTask(){
    this.complete.emit(this.task.id);
  }
}

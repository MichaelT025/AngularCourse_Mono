import { Component, Input, Output, EventEmitter } from '@angular/core';
import { task_T } from './task.model';
import { Card } from "../../shared/card/card";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-task',
  imports: [Card, DatePipe],
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

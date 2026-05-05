import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { TasksService } from '../tasks.service';
@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.html',
  styleUrl: './new-task.css',
  standalone: false
})
export class NewTask {
  @Input() userId!: string;
  @Output() close = new EventEmitter<void>();
  enteredTitle='';
  enteredSummary='';
  enteredDueDate='';
  private tasksService =inject(TasksService)
  
  onCancel() {
    this.close.emit();
  }
  
  onSubmit() {
    this.tasksService.addTask({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.enteredDueDate
    }, this.userId);
    this.close.emit();
  }
}

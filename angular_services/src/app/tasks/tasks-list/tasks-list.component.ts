import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TASK_STATUS_OPTIONS, taskStatusOptionsProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [CommonModule, TaskItemComponent],
  providers: [taskStatusOptionsProvider]

})
export class TasksListComponent {
  private TasksService = inject(TasksService);
  private selectedFilter = signal<string>('all');
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);
  tasks = computed(() => { 
    switch (this.selectedFilter()) {
      case 'open': return this.TasksService.allTasks().filter(task => task.status === 'OPEN');
      case 'in-progress': return this.TasksService.allTasks().filter(task => task.status === 'IN_PROGRESS');
      case 'done': return this.TasksService.allTasks().filter(task => task.status === 'DONE');
      default: return this.TasksService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}

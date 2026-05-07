import { Component } from '@angular/core';
import { SafeLinkDiective } from '../safe-link.directive';
import { LogDirective } from '../log.directive';

@Component({
  selector: 'app-learning-resources',
  templateUrl: './learning-resources.component.html',
  styleUrl: './learning-resources.component.css',
  standalone: true,
  imports: [SafeLinkDiective, LogDirective],
})
export class LearningResourcesComponent {}

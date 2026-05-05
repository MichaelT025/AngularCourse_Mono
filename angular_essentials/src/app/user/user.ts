import { Component, Input, Output, EventEmitter } from '@angular/core';
import { user_T } from './user.model';
@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrl: './user.css',
  standalone: false
})
export class User {
  @Input({required: true}) user!: user_T;
  @Input() selected!: boolean;
  @Output() select = new EventEmitter<string>();
  
  get imagePath() {
    return 'assets/users/' + this.user.avatar;
  }
  onSelectUser() {
    this.select.emit(this.user.id);
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DUMMY_USERS } from '../dummy_users';
@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  @Input() id!: string;
  @Input() avatar!: string;
  @Input() name!: string;
  @Output() select = new EventEmitter();
  
  get imagePath() {
    return 'assets/users/' + this.avatar;
  }
  onSelectUser() {
    this.select.emit(this.id);
  }
}

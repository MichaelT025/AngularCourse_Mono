import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import{Header} from './header/header';
import { User } from "./user/user";
import{ DUMMY_USERS } from './dummy_users';
import{ Tasks } from './tasks/tasks';

@Component({
  selector: 'app-root',
  imports: [Header, User, Tasks],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('first_angular');
  users=DUMMY_USERS;
  selectedUserID?:string;
  get selectedUser(){
    return this.users.find(user=>user.id===this.selectedUserID)!;
  }
  onSelectUser(id:string){
    this.selectedUserID=id;
  }
}

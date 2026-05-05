import { Component, signal } from '@angular/core';
import{ DUMMY_USERS } from './dummy_users';
import { Header } from './header/header';


@Component({
  selector: 'app-root',
  standalone: false,
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

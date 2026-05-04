import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import{Header} from './header/header';
import { User } from "./user/user";
import{ DUMMY_USERS } from './dummy_users';

@Component({
  selector: 'app-root',
  imports: [Header, User],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('first_angular');
  users=DUMMY_USERS;
  onSelectUser(id:string){
    console.log("Selected user with id: " + id);
  }
}

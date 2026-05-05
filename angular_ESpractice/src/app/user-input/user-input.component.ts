import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  enteredInitialInvestement='0';
  enteredAnnualInvestement='4000';
  enteredExpectedReturn='5';
  enteredDuration='10';
  onSubmit(){
    console.log('Form submitted');
    console.log(this.enteredInitialInvestement);
    console.log(this.enteredAnnualInvestement);
    console.log(this.enteredExpectedReturn);
    console.log(this.enteredDuration);
  }
}

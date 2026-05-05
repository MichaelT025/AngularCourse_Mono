import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentData } from '../investment_data.model';
@Component({
  selector: 'app-user-input',
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  @Output() calculate = new EventEmitter<InvestmentData>();
  investmentData: InvestmentData = {
    initialInvestment: 0,
    annualInvestment: 4000,
    expectedReturn: 5,
    duration: 10
  };
  onSubmit(){
    this.calculate.emit(this.investmentData);
  }
}

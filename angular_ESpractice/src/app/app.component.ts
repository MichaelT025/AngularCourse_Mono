import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from "./user-input/user-input.component";
import { AppService } from './app.service';
import { InvestmentData } from './investment_data.model';
import { ResultsComponent } from "./results/results.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, UserInputComponent, ResultsComponent],
  providers: [AppService]
})
export class AppComponent {
  constructor(private appService: AppService) {}
  resultsData?:{
    year: number;
    interest: number;
    valueEndOfYear: number;
    annualInvestment: number;
    totalInterest: number;
    totalAmountInvested: number;
  }[];
  calculateInvestmentResults(investmentData: InvestmentData) {
    this.resultsData = this.appService.calculateInvestmentResults(investmentData);
  }
}

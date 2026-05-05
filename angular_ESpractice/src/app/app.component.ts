import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from "./user-input/user-input.component";
import { AppService } from './app.service';
import { InvestmentData } from './investment_data.model';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, UserInputComponent],
  providers: [AppService]
})
export class AppComponent {
  constructor(private appService: AppService) {}

  calculateInvestmentResults(investmentData: InvestmentData) {
    this.appService.calculateInvestmentResults(investmentData);
  }
}

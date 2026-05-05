import { Injectable } from "@angular/core";
import { InvestmentData } from "./investment_data.model";

@Injectable({providedIn: 'root'})
export class AppService{
  calculateInvestmentResults(investmentResult: InvestmentData) {
    const annualData = [];
    let investmentValue = investmentResult.initialInvestment;

    for (let i = 0; i < investmentResult.duration; i++) {
        const year = i + 1;
        const interestEarnedInYear = investmentValue * (investmentResult.expectedReturn / 100);
        investmentValue += interestEarnedInYear + investmentResult.annualInvestment;
        const totalInterest =
      investmentValue - investmentResult.annualInvestment * year - investmentResult.initialInvestment;
        annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: investmentResult.annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: investmentResult.initialInvestment + investmentResult.annualInvestment * year,
        });
    }
  
        return annualData;
  }
}
import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-portfolio-history',
  imports: [DatePipe],
  templateUrl: './portfolio-history.component.html',
  styleUrl: './portfolio-history.component.scss'
})
export class PortfolioHistoryComponent {
  private portfolioService = inject(PortfolioService);
  portfolioHistory: any[] = [];
  ngOnInit() {
    this.getPortfolioHistory();
  }
  getPortfolioHistory() {
    this.portfolioService.getPortfolioHistory().subscribe({
      next: (res: any) => {
        this.portfolioHistory = res;
        this.portfolioService.$portfolioHistory.next(res);
      }
    });
  }
}

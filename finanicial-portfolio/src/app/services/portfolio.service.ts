import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private http = inject(HttpClient);
  public $getAssets = new BehaviorSubject<any>(null);
  public $portfolioHistory = new BehaviorSubject<any>(null);
  getAssets() {
    return this.http.get('/api/assets');
  }
  getPortfolioHistory() {
    return of([{
      type: 'Gold',
      amount: 10000,
      date: '2023-01-01'
    }, {
      type: 'Real Estate',
      amount: 30000,
      date: '2023-01-01'
      }
    ]);
  }
  getGoldMarketTrends() {
    return of([{
      label: 'Jan',
      value: 6000
    }, {
      label: 'Feb',
      value: 6500
    }, {
      label: 'Mar',
      value: 7000
    }, {
      label: 'Apr',
      value: 7500
    }, {
      label: 'May',
      value: 9000
    }])
  }
}

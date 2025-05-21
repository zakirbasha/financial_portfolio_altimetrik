import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PortfolioService } from '../../services/portfolio.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { InvestmetFormComponent } from '../../shared/investmet-form/investmet-form.component';

@Component({
  selector: 'app-dashboard',
  imports: [BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dialog = inject(MatDialog);
  pieChartType: ChartType = 'pie';
  lineChartType: ChartType = 'line';
  lineChartLabels: string[] = [];
  lineChartData: ChartData<'line'> = {
    labels: this.lineChartLabels,
    datasets: [
      {
        data: [],
        fill: true,
        borderColor: '#FF6384',
        backgroundColor: '#FF6384',
      },
    ],
  };
  pieChartLabels: string[] = [];
  pieChartLegend = true;
  assets: number[] = [];
  pieChartData: ChartData<'pie'> = {
    labels: this.pieChartLabels,
    datasets: [
      {
        data: this.assets,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };
  pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };
  private portfolioService = inject(PortfolioService);
  assetsData: any;
  ngOnInit() {
    this.getAssets();
    this.getGoldTrend();
  }
  getGoldTrend() {
    this.portfolioService.getGoldMarketTrends().subscribe({
      next: (res) => {
        this.lineChartLabels = res?.map((item: any) => item.label);
        this.lineChartData = {
          labels: res?.map((item: any) => item.label),
          datasets: [
            {
              label: 'Gold Price Trend',
              data: res?.map((item: any) => item.value),
              fill: false,
              borderColor: '#FF6384',
              backgroundColor: '#FF6384',
            },
          ],
        };
      }
    });
  }
  getAssets() {
    this.portfolioService.$getAssets.subscribe({
      next: (res) => {
        this.assetsData = res;
        this.pieChartLabels = res?.data?.map((item: any) => item.label);
        this.assets = res.data?.map((item: any) => item.value);
        this.pieChartData = {
          labels: this.pieChartLabels,
          datasets: [
            {
              data: this.assets,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
              ],
            },
          ],
        };
      },
      error: (err) => {
        console.error('Error fetching assets:', err);
      }
    });
  }
  openForm() {
    const dialog = this.dialog.open(InvestmetFormComponent, {
      width: '800px',
      height: '600px'
    });
    dialog.afterClosed().subscribe((result) => {
      const data = this.assetsData?.data?.map((item: any) => {
            return {
              label: item.label,
              value: item.label === result?.assetType ? item.value + (result?.quantity * result?.price) : item.value
            }
      })
      const res = {
        data: data
      }
      this.portfolioService.$getAssets.next(res);
      this.portfolioService.$portfolioHistory.next([
        ...this.portfolioService.$portfolioHistory.getValue(),
        {
          type: result?.assetType,
          amount: result?.quantity * result?.price,
          date: result?.date
        }
      ]);
    }
    );

  }
}

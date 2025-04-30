import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { SideMenuComponent } from '../../shared/side-menu/side-menu.component';
import { RouterOutlet } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  imports: [HeaderComponent, SideMenuComponent,RouterOutlet],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  ngOnInit() {
    this.getAssets();
  }
  getAssets() {
    this.portfolioService.getAssets().subscribe((res) => {
      this.portfolioService.$getAssets.next(res);
      console.log(res);
    });
  }
}

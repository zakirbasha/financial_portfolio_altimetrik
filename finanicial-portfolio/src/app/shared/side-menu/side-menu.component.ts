import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  menuList = [
    {
      name: 'Dashboard',
      path: 'dashboard',
    },
    {
      name: 'Portfolio History',
      path: 'portfolio-history',
    }
  ];
}

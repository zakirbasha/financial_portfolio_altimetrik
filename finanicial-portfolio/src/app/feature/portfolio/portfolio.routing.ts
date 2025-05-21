import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    redirectTo: '',
    pathMatch: 'full'
}, {
    path: '',
    loadComponent: () => import('./portfolio.component').then(c => c.PortfolioComponent),
    children: [
        {
            path: 'dashboard',
            loadComponent: () => import('../dashboard/dashboard.component').then(c => c.DashboardComponent)
        }, {
            path: 'portfolio-history',
            loadComponent: () => import('../portfolio-history/portfolio-history.component').then(c => c.PortfolioHistoryComponent)
        }

    ]
},{
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
}];
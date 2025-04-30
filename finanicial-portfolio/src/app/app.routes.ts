import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
}, {
    path: 'home',
    loadChildren: () => import('./feature/portfolio/portfolio.routing').then(c =>c.routes)    
    }, {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
}];

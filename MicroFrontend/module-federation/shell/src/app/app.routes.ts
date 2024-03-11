import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('micro-frontend/HomeModule').then(m => m.HomeModule)
    }
];

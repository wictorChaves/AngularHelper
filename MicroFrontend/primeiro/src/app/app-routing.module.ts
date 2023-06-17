import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Feature2Component } from './feature2/feature2.component';

const routes: Routes = [
  {
    path: 'feature1',
    loadChildren: () => import('./feature1/feature1.module').then(m => m.Feature1Module)
  },
  {
    path: 'feature2',
    component: Feature2Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { StatementComponent } from '../pages/statement/statement.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  // {
  //   path:'**',
  //   component: HomeComponent
  // },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'statement',
    component: StatementComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }

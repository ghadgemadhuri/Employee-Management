import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpListComponent } from './emp-list/emp-list.component';
import { EmpRegistrationComponent } from './emp-registration/emp-registration.component';


const routes: Routes = [
  {
    path: 'employee/register',
    component: EmpRegistrationComponent,
  },
  {
    path: 'employee/list',
    component: EmpListComponent,
  },
  {
    path: '',
    redirectTo: 'employee/register',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'employee/register',
    pathMatch: 'full'

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpListComponent } from './emp-list/emp-list.component';
import { EmpRegistrationComponent } from './emp-registration/emp-registration.component';
import { LoginComponent } from './login/login.component';

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
  path: 'employee/login',
    component: LoginComponent,

  },
  {
    path: '',
    redirectTo: 'employee/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'employee/login',
    pathMatch: 'full'

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

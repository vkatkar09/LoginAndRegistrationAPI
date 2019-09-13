import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
{
  path : 'login',
  loadChildren : './components/login/login.module#LoginModule'
},
{

  path : 'registration',
  loadChildren : './components/registration/registration.module#RegistrationModule'
},
{
  path : 'home',
  component : HomeComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

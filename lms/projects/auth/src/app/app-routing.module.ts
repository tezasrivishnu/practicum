import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  // { path: 'auth/login', component: LoginComponent }, 
  { 
    path: 'auth', 
    component:LoginComponent , 
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  // {path:'auth:comp',redirectTo:'/auth/login/:comp'},
  { path:'auth/login/:name', component:LoginComponent }, // program-catalog
  { path:'auth/login/:paramOne/:paramTwo', component:LoginComponent }, //home page of a course
  {path: 'auth/login/:p1/:p2/:p3/:p4', component: LoginComponent},
  { path: 'auth/forgot-password', component:ForgotPasswordComponent },
  { path: 'auth/reset-password/:token', component: ResetPasswordComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

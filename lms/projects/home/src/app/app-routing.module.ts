import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramHomeComponent } from './program-home/program-home.component';
import { ProgramCatalogComponent } from './program-catalog/program-catalog.component';
import { LoginComponent } from 'projects/auth/src/app/login/login.component';

const routes: Routes = [
  {path: 'home',  redirectTo : 'auth/login/home' , pathMatch: 'full'},
  { path: 'home/:programId', component: ProgramHomeComponent },
  { path: 'program-catalog', component: ProgramCatalogComponent },
  { path: '', component: ProgramCatalogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

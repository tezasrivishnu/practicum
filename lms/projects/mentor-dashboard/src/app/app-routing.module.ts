import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCourseComponent } from './create-course/create-course.component';
import { from } from 'rxjs';

const routes: Routes = [
  { path: 'cc', component: CreateCourseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessonsMasterComponent } from './lessons-master/lessons-master.component';
import { LessonComponent } from './lesson/lesson.component';

const appRoutes: Routes = [
  { path: 'studytable/activities/:programId/:courseInstanceId/:lessonId', component: LessonComponent, data : {courseId : 'someId'}},
  { path: 'studytable/courses/:programId/:courseInstanceId', component: LessonsMasterComponent,data : {courseId : 'someId'} }
  // { path: '', redirectTo: '/studytable/courses/intro_to_deep_learning', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


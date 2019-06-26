import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgressComponent } from './progress/progress.component';
const routes: Routes = [
  { path: 'course-progress', component: ProgressComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

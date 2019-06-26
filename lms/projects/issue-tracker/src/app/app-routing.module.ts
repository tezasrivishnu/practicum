import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportIssueComponent } from './report-issue/report-issue.component';

const routes: Routes = [
  { path: 'issue-tracker', component: ReportIssueComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

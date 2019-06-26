import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCourseComponent } from './create-course/create-course.component';
import { InviteComponent } from './invite/invite.component';
import { CreateProgramComponent } from './create-program/create-program.component';
import { ModifyCourseCatalogComponent } from './modify-course-catalog/modify-course-catalog.component';
import { ManageProgramsComponent } from './manage-programs/manage-programs.component';
import { CourseInvitesComponent } from './course-invites/course-invites.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService as AuthGuard  } from "./auth-guard.service";
import { MentorStudentAllocationComponent } from './mentor-student-allocation/mentor-student-allocation.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { ProgramInvitesComponent } from './program-invites/program-invites.component';

const routes: Routes = [
  { path: 'create-course', component: CreateCourseComponent,canActivate:[AuthGuard] },
  { path: 'create-program', component: CreateProgramComponent,canActivate:[AuthGuard] },
  { path: 'invite', component: InviteComponent,canActivate:[AuthGuard] },
  { path: 'modify-catalog', component: ModifyCourseCatalogComponent,canActivate:[AuthGuard] },
  { path: 'manage-programs', component: ManageProgramsComponent ,canActivate:[AuthGuard] },
  { path: 'course-invite/:instanceID', component: CourseInvitesComponent,canActivate:[AuthGuard] },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: DashboardComponent,canActivate:[AuthGuard] },
  {path:'add/:program_id',component:AddCourseComponent},
  {path:'program-invites/:role/:program_id',component:ProgramInvitesComponent},
  { path: 'mentor-student-allocation', component: MentorStudentAllocationComponent ,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

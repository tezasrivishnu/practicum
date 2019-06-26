import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BatchInviteComponent } from './batch-invite/batch-invite.component';
import { InviteStatusComponent } from './invite-status/invite-status.component';
import { SingleInviteStatusComponent } from './invite-status/single-invite-status/single-invite-status.component';
import { InviteErrorComponent } from './invite-error/invite-error.component';
import { FilterPipe } from './invite-status/filter.pipe';
import { CategoryPipe } from './invite-status/category.pipe';
import { CreateCourseComponent } from './create-course/create-course.component';
import { InviteComponent } from './invite/invite.component';
import { CreateProgramComponent } from './create-program/create-program.component';
import { ModifyCourseCatalogComponent } from './modify-course-catalog/modify-course-catalog.component';
import { ManageProgramsComponent } from './manage-programs/manage-programs.component';
import { ManageCourseComponent } from './manage-programs/manage-course/manage-course.component';
import { CourseInstanceModalComponent } from './manage-programs/manage-course/course-instance-modal/course-instance-modal.component';
import { CourseInvitesComponent } from './course-invites/course-invites.component';
import { StudentComponent } from './course-invites/student/student.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MentorStudentAllocationComponent } from './mentor-student-allocation/mentor-student-allocation.component';
import { DndDirective } from './mentor-student-allocation/dnd.directive';
import { BatchesComponent } from './mentor-student-allocation/batches/batches.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { ProgramInvitesComponent } from './program-invites/program-invites.component';
import { StudentCardComponent } from "./program-invites/student-card/student-card.component";

@NgModule({
   declarations: [
      AppComponent,
      BatchInviteComponent,
      InviteStatusComponent,
      SingleInviteStatusComponent,
      InviteErrorComponent,
      FilterPipe,
      CategoryPipe,
      CreateCourseComponent,
      InviteComponent,
      CreateProgramComponent,
      ModifyCourseCatalogComponent,
      ManageProgramsComponent,
      ManageCourseComponent,
      CourseInstanceModalComponent,
      CourseInvitesComponent,
      StudentComponent,
      DashboardComponent,
      MentorStudentAllocationComponent,
      DndDirective,
      BatchesComponent,
      NavbarComponent,
      AddCourseComponent,
      ProgramInvitesComponent,
      StudentCardComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      DragDropModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      BrowserAnimationsModule,
      HttpClientModule
   ],
   entryComponents: [
      CourseInstanceModalComponent
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
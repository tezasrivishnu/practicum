import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthSharedModule } from 'projects/auth/src/app/app.module';
import { SignupSharedModule } from 'projects/signup/src/app/app.module';
import { HomeSharedModule } from 'projects/home/src/app/app.module';
import { IssueTrackerSharedModule } from 'projects/issue-tracker/src/app/app.module';
import { MentorDashboardSharedModule } from 'projects/mentor-dashboard/src/app/app.module';
import { CourseProgressSharedModule } from 'projects/course-progress/src/app/app.module';
import { NavbarComponent } from './navbar/navbar.component';
import { CreditsSharedModule } from 'projects/credits/src/app/app.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponentComponent } from './edit-component/edit-component.component';
import { UserDisplayComponent } from './user-display/user-display.component';
import { UserComponent } from './user/user.component';
import { ClassmatesComponent } from './classmates/classmates.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { ClassmateProfileComponent } from './classmate-profile/classmate-profile.component';
import { RequestComponent } from './request/request.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserProfileComponent,
    EditComponentComponent,
    UserDisplayComponent,
    UserComponent,
    ClassmatesComponent,
    FriendListComponent,
    ClassmateProfileComponent,
    RequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthSharedModule.forRoot(),
    SignupSharedModule.forRoot(),
    HomeSharedModule.forRoot(),
    IssueTrackerSharedModule.forRoot(),
    MentorDashboardSharedModule.forRoot(),
    CourseProgressSharedModule.forRoot(),
    CreditsSharedModule.forRoot(),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthSharedModule } from 'projects/auth/src/app/app.module';
import { SignupSharedModule } from 'projects/signup/src/app/app.module';
import { AppModule } from './app.module';
import { StudytableSharedModule } from 'projects/studytable/src/app/app.module';
import { HomeSharedModule } from 'projects/home/src/app/app.module';
import { IssueTrackerSharedModule } from 'projects/issue-tracker/src/app/app.module';
import { MentorDashboardSharedModule } from 'projects/mentor-dashboard/src/app/app.module';
import { CourseProgressSharedModule } from 'projects/course-progress/src/app/app.module';
import { CreditsSharedModule } from 'projects/credits/src/app/app.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {UserDisplayComponent} from './user-display/user-display.component'
import { EditComponentComponent } from './edit-component/edit-component.component';
import { UserComponent } from './user/user.component';
import { ClassmatesComponent } from './classmates/classmates.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { ClassmateProfileComponent } from './classmate-profile/classmate-profile.component';
import { RequestComponent } from './request/request.component';

const routes: Routes = [
  { path: 'auth', loadChildren: '../../projects/auth/src/app/app.module#AuthSharedModule' },
  { path: 'signup', loadChildren: '../../projects/signup/src/app/app.module#SignupSharedModule' },
  { path: 'studytable', loadChildren: '../../projects/studytable/src/app/app.module#StudytableSharedModule' },
  { path: 'home', loadChildren: '../../projects/home/src/app/app.module#HomeSharedModule' },
  { path: 'issue-tracker', loadChildren: '../../projects/issue-tracker/src/app/app.module#IssueTrackerSharedModule' },
  { path: 'mentor-dashboard', loadChildren: '../../projects/mentor-dashboard/src/app/app.module#MentorDashboardSharedModule' },
  { path: 'course-progress', loadChildren: '../../projects/course-progress/src/app/app.module#CourseProgressSharedModule' },
  { path: 'program-catalog', loadChildren: '../../projects/home/src/app/app.module#HomeSharedModule' },
  { path: 'credits', loadChildren: '../../projects/credits/src/app/app.module#CreditsSharedModule' },
  { path: 'user-profile', component:UserProfileComponent},
  { path: 'edit/:id', component:EditComponentComponent},
  { path: 'user-display', component:UserDisplayComponent},
  {path:'user',component: UserComponent},
  {path:'classmates', component: ClassmatesComponent},
  {path:'request', component:RequestComponent},
  {path:'friends',component:FriendListComponent},
  {path:'classmate-profile/:id', component:ClassmateProfileComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthSharedModule.forRoot(),
    SignupSharedModule.forRoot(),
    StudytableSharedModule.forRoot(),
    HomeSharedModule.forRoot(),
    IssueTrackerSharedModule.forRoot(),
    MentorDashboardSharedModule.forRoot(),
    CourseProgressSharedModule.forRoot(),
    CreditsSharedModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

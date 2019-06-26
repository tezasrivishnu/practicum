import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { MaterialModule } from "../../../../src/app/material";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProgressComponent } from './progress/progress.component';
import { SubmissionComponent } from './submission/submission.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';
import { EvalFormComponent } from './eval-form/eval-form.component';
import { UserPipe, CoursePipe, ModulePipe, EvaluationStatusPipe, ActivityTypePipe, CourseInstancePipe, ProgramPipe } from './pipes';
import { SelectDialogComponent } from './select-dialog/select-dialog.component';
const providers = []


@NgModule({
  declarations: [
    AppComponent,
    ProgressComponent,
    SubmissionComponent,
    EvalFormComponent,
    UserPipe,
    CoursePipe,
    ModulePipe,
    EvaluationStatusPipe,
    ActivityTypePipe,
    CourseInstancePipe,
    ProgramPipe,
    SelectDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  entryComponents:[
    SelectDialogComponent
  ],
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule { }

@NgModule({})
export class CourseProgressSharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: providers
    }
  }
}
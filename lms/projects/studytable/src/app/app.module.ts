import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LessonCardComponent } from './lesson-card/lesson-card.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LessonsMasterComponent } from './lessons-master/lessons-master.component';
import { LessonComponent } from './lesson/lesson.component';

import { EmbedVideo } from 'ngx-embed-video';
import { VideoLessonComponent } from './video-lesson/video-lesson.component';
import { SafePipe } from './safe.pipe';
import { QuestionComponent } from './question/question.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';

import { ReactiveFormsModule } from '@angular/forms';
import { AssignmentComponent } from './assignment/assignment.component';
import { StripfilenamePipe } from './stripfilename.pipe';
import { NotesComponent } from './notes/notes.component';
import { AssigmentEvaluationsComponent } from './assigment-evaluations/assigment-evaluations.component';
import { MaterialModule } from 'src/app/material';

const providers = []

@NgModule({
  declarations: [
    AppComponent,
    LessonCardComponent,
    LessonsMasterComponent,
    LessonComponent,
    VideoLessonComponent,
    SafePipe,
    QuestionComponent,
    AssignmentComponent,
    StripfilenamePipe,
    NotesComponent,
    AssigmentEvaluationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MaterialModule,
    EmbedVideo.forRoot(),
    MatCheckboxModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: providers,
  bootstrap: [AppComponent]
})

export class AppModule { }

@NgModule({})
export class StudytableSharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: providers
    }
  }
}

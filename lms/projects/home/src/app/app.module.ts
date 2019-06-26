import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { MaterialModule } from "../../../../src/app/material";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatChipsModule, MatButtonModule,   MatCardModule, MatInputModule  } from '@angular/material';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ProgramHomeComponent } from './program-home/program-home.component';
import {PublishContentDialog} from './course-panel/course-panel.component';
import { ProgramCatalogComponent } from './program-catalog/program-catalog.component';
import { CoursePanelComponent } from './course-panel/course-panel.component';
const providers = [];
@NgModule({
  declarations: [
    AppComponent,
    ProgramHomeComponent,
    ProgramCatalogComponent,
    PublishContentDialog,
    CoursePanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,MatChipsModule, MatButtonModule,   MatCardModule,HttpClientModule,
    BrowserAnimationsModule,MaterialModule,FormsModule,ReactiveFormsModule,MatInputModule, MatSlideToggleModule
  ],
  entryComponents: [PublishContentDialog],
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
@NgModule({})
export class HomeSharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: providers
    }
  }
}
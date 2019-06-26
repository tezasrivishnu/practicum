import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../../../src/app/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CaptureModelComponent } from './capture-model/capture-model.component';
import { UploadModelComponent } from './upload-model/upload-model.component';
import { OtpVerificationModelComponent } from './otp-verification-model/otp-verification-model.component';
import { NotFoundComponent } from './not-found/not-found.component';

const providers = [];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    CaptureModelComponent,
    UploadModelComponent,
    OtpVerificationModelComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: providers,
  bootstrap: [AppComponent],
  entryComponents: [
    CaptureModelComponent,
    UploadModelComponent,
    OtpVerificationModelComponent
  ]
})
export class AppModule { }

@NgModule({})
export class SignupSharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: providers
    }
  }
}
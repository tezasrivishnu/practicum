import { Component, OnInit, Directive } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, NG_ASYNC_VALIDATORS, AsyncValidator, ValidationErrors } from '@angular/forms';
import { CaptureModelComponent } from '../capture-model/capture-model.component';
import { UploadModelComponent } from '../upload-model/upload-model.component';
import { OtpVerificationModelComponent } from '../otp-verification-model/otp-verification-model.component';
import { MatDialog, MatDialogConfig,MatSnackBar } from '@angular/material';
import { RequestService } from '../request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of as observableOf, Observable } from 'rxjs';
import { error } from 'util';

var otpCheck:boolean;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  tip:String;
  formGroup: FormGroup;
  titleAlert: string;
  post: any;
  capture: any;
  otpCheck: boolean;
  otp:any;
  subscribeTimer: any;
  selected = '';
  timeLeft: number;
  clicked = false;
  isLinear = false;
  user; 
  code;
  error;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private requestService: RequestService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.otp = '123';
    otpCheck = false;
    this.timeLeft = 300;
    this.titleAlert = 'This field is required';
  }

  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
    }
  }

  ngOnInit() {
    this.isLinear = true;
    this.user = {email: '', userID: ''};
    this.code = this.route.snapshot.paramMap.get('code');
    
    this.requestService.getUser(this.code).subscribe((data) => {
      // console.log(data, 'batman');

      console.log(error)
      this.user = data;
      if (data) {
        this.createForm();
        return;
      }
    },
    (err) => {
      if(err.status == 404) {
        /// you can check for any status like 404 not found 
        this.router.navigateByUrl('/notfound');
      } 
      if(err.status == 403) {
        /// you can check for any status like 404 not found 
        this.post = "complete";
        this.error = 403;
      } 
    });
    this.createForm();    
    this.tip = 'The password should contain atleast 8 characters, 1 small letter, 1 capital letter, 1 number and 1 special character';
  }

  createForm() {
    let regExp: RegExp = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          'email': new FormControl({value: this.user.email, disabled: true}),
          'userID': new FormControl({value: this.user.userID, disabled: true}),
          'role': new FormControl({value: this.user.type, disabled: true}),
          'firstName': [null, Validators.required],
          'lastName': [null, Validators.required],
          'password': [null, [Validators.required, Validators.pattern(regExp)]],
          'confirmPassword': [null, Validators.required],
          'dateOfBirth': [null, Validators.required],
          'gender': new FormControl(null, Validators.required),
        },{
          validator: this.MustMatch('password', 'confirmPassword')
        }),
        this.formBuilder.group({
          'image': new FormControl(null, Validators.required)
        }),
        this.formBuilder.group({
          'phoneNo':  new FormControl(null, [Validators.required, this.otpValidator, Validators.pattern("[1-9]{1}[0-9]{9}")])
        })
      ])
    });
  }

  openCaptureModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {capture: this.capture};
    const dialogRef = this.dialog.open(CaptureModelComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        this.capture = result;
        this.formGroup.get('formArray')['controls'][1].patchValue({image: this.capture});
      });
  }
  
  openOtpVerificationModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {phoneNo: this.formGroup.value.formArray[2].phoneNo, ok: false};
    const dialogRef = this.dialog.open(OtpVerificationModelComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if (result) {
          otpCheck = true;
          this.otpCheck = true;
          this.formGroup.get('formArray')['controls'][2].controls['phoneNo'].clearValidators();
          this.formGroup.get('formArray')['controls'][2].controls['phoneNo'].updateValueAndValidity();
          this.user['phoneNo'] = this.formGroup.get('formArray')['controls'][2].controls['phoneNo'].value;
          this.formGroup.get('formArray')['controls'][2].controls['phoneNo'].disable();
        }
      }
    );
    this.startCountdown(this.timeLeft);
  }

  openUploadModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {capture: this.capture};
    const dialogRef = this.dialog.open(UploadModelComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        this.capture = result;
        this.formGroup.get('formArray')['controls'][1].patchValue({image: this.capture});
      }
    );

  }

  onSubmit({formArray}) {
    if (!this.formGroup.valid) {
      this.snackBar.open('All fields should be filled and valid', '', {
        duration: 2000,
      });
      return;
    }
    var temp = {additionalInfo:{}};
    console.log("formarray->",temp);
    console.log("formarray->",formArray[0]);
    this.post = {...formArray[0], ...formArray[1], ...formArray[2], ...{email: this.user.email, userID: this.user.userID, phoneNo: this.user.phoneNo, role: this.user.type, isPrivate:true}};
    delete this.post['confirmPassword'];
    this.post['dateOfBirth'] = this.formatDate(this.post['dateOfBirth']);
    this.requestService.sendData(this.post, this.code);
    console.log("post->",this.post);
  }

  startCountdown(seconds){
    var counter = seconds;
    var interval = setInterval(() => {
      counter--;
      this.subscribeTimer = counter+1
      if(counter < 0 ){
        clearInterval(interval);
        return
      };
    }, 1000);
  };
  

  sendOTP() {
    this.requestService.sendOTP(this.formGroup.value.formArray[2].phoneNo);
    this.clicked = true;
  }

  otpValidator(control: AbstractControl): {[key: string]: boolean} | null {
    const forbidden = !otpCheck;
    return forbidden ? {'otpNotVerified': true} : null;
  };
  
  
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  checkDate(control: AbstractControl): {[key: string]: boolean} | null {
    const birth_y:number = control.value.getFullYear();
    const today_y:number = new Date().getFullYear();
    if ((today_y  - birth_y) < 17) {
      control.setErrors({dateInvalid: true});
      return {'invalidDate': true};
    }
    else {
      return null;
    }
  }

  formatDate(date) {
    var dd = date.getDate();
    var mm = date.getMonth()+1; 
    var yyyy = date.getFullYear();
    if(dd<10) 
    {
      dd='0'+dd;
    } 

    if(mm<10) 
    {
      mm='0'+mm;
    } 
    return mm+'/'+dd+'/'+yyyy;
  }
  check() {
    console.log(this.formGroup.get('formArray'));
    var date = this.formGroup.get('formArray')['controls'][0].controls['dateOfBirth'].value;
    date = this.formatDate(date);
    console.log(date);
  }

  checkTouched(i, control) {
    return this.formGroup.get('formArray')['controls'][i].controls[control].touched;
  }

  checkErrors(i, control) {
    return this.formGroup.get('formArray')['controls'][i].controls[control].errors;
  }

  checkRequired(i, control) {
    if (!this.checkErrors(i, control)) return false;
    return this.formGroup.get('formArray')['controls'][i].controls[control].errors.required;
  }

  checkValid(i, control) {
    return this.formGroup.get('formArray')['controls'][i].controls[control].valid;
  }

  checkMustMatch() {
    if (!this.checkErrors(0, 'confirmPassword')) return false;
    return this.formGroup.get('formArray')['controls'][0].controls['confirmPassword'].errors.mustMatch;
  }

  checkPattern(i, control) {
    if (!this.checkErrors(i, control)) return false;
    return this.formGroup.get('formArray')['controls'][i].controls[control].errors.pattern;
  }

  checkOtpNotVerified() {
    if (!this.checkTouched(2, 'phoneNo')) return false;
    if (!this.checkErrors(2, 'phoneNo')) return false;
    if (this.checkRequired(2, 'phoneNo')) return false;
    return this.formGroup.get('formArray')['controls'][2].controls['phoneNo'].errors.otpNotVerified;
  }

  phoneNoChanged() {
    if (this.formGroup.get('formArray')['controls'][2].controls['phoneNo'].value == " ") {
      this.formGroup.get('formArray')['controls'][2].controls['phoneNo'].patchValue({phoneNo: ""})
    }
  }
}
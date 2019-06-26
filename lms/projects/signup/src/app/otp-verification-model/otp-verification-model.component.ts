import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-otp-verification-model',
  templateUrl: './otp-verification-model.component.html',
  styleUrls: ['./otp-verification-model.component.css']
})
export class OtpVerificationModelComponent implements OnInit {

  formGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<OtpVerificationModelComponent>, 
    private snackBar: MatSnackBar, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private requestService: RequestService
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      'otp': [null, Validators.required]
    });
  }

  onSubmit(post) {
    const data = {
      phoneNo: this.data.phoneNo,
      otp: post.otp
    };
    this.requestService.verifyOTP(data).subscribe( x => {
      if (x) {
        this.dialogRef.close(true);
      }
      else {
        this.snackBar.open('wrong otp', '', {
          duration: 2000,
        });
        return;
      }
    }); 
  }
}

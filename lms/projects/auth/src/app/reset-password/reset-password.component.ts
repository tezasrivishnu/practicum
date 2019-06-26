import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MustMatch } from './retype-validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  formBuilder;
  myForm;
  bg;
  errorress;
  success;
  titleAlert: string = 'This field is required';
  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) {
    // this.route.params.subscribe(res=>console.log(res))
    this.formBuilder = new FormBuilder();
    this.myForm = this.formBuilder.group({
      'password': [null, [Validators.required]],
      'retypepassword': [null, [Validators.required]],
      'validate': ''
    }, {
        validator: MustMatch('password', 'retypepassword')
      });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.myForm.valid) return;
    var data = this.myForm.value;
    var token = this.route.snapshot.paramMap.get("token");
    console.log(token);
    data["validate"] = token;
    console.log(data)
    this.httpClient.post(environment.apiBaseUrl + '/api/auth/reset-password', data).subscribe(data => {
      this.success = "success"
      this.errorress = ""
      console.log(this.success);
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1500);
    }, err => {
      this.errorress = "Passwords Should match"
    });
  }
}

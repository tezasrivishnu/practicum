import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  formBuilder;
  myForm;
  bg;
  errorress: boolean;
  success: boolean;

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.formBuilder = new FormBuilder();
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.myForm = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'validate': ''
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.myForm.valid) return;
    var data = this.myForm.value;
    this.httpClient.post(environment.apiBaseUrl + '/api/auth/forgot-password', data).subscribe(data => {
      this.success = true;
      this.errorress = false;
    }, err => {
      this.errorress = true;
    });
  }

}

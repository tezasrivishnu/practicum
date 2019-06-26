import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup,FormBuilder, Validators  } from "@angular/forms";
var jwtDecode = require('jwt-decode');

@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.css']
})
export class ReportIssueComponent implements OnInit {
  email: string;
  issue: string;
  errorress;
  urlfrom;
  myForm:FormGroup;
  formBuilder:FormBuilder;
  titleAlert: string = 'This field is required';
  constructor(private httpClient: HttpClient, private router: Router,private route: ActivatedRoute) {
    this.formBuilder = new FormBuilder();
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.myForm = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'issue': [null, [Validators.required]]
    });
  }
  ngOnInit() {
    console.log("someone called me report-issue");
    this.email = this.getEmail(localStorage.getItem('access-token'));
    if(this.route.snapshot.paramMap!=null){
      console.log(this.route.snapshot.paramMap)
      this.urlfrom=this.route.snapshot.paramMap.get('name');
    }
    else {
      this.urlfrom="issue-tracker";
    }
  }
  onSubmit(){
    if(!this.myForm.valid) return;
    var data = this.myForm.value;
    this.httpClient.post(location.origin + '/api/issue/report', data).subscribe(data=>{
      console.log(data);
      this.errorress=data['message'];
      // this.router.navigate(['/'+this.urlfrom])
      console.log(this.urlfrom);
      // if(this.bg.valid) this.router.navigate(['/homepage']);
    },err=>{
      this.errorress="Something went wrong. Issue not reported."
    });
  }
  getEmail(token: string){
    console.log("token", token);
    var email = null;
    if(token){
      
      try {
        var decoded = jwtDecode(token);
        email = decoded.email;
      } catch (error) {
        console.log(error);
      }
      console.log(email);
      return email;
    }else{
      return email;
    }
  }
}

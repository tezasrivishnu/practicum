import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { environment } from 'src/environments/environment';
import { any } from '@tensorflow/tfjs-core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  token: string;
  bg;
  errorress;
  myForm: FormGroup;
  formBuilder: FormBuilder;
  urlfrom;
  userId: string;
  enrolledPrograms: any[];
  routeParamOne: string;
  routeParamTwo: string;
  paramsLength: number;
  redirectURL: string;
  private routeData;

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) {
    // this.route.params.subscribe(res=>console.log(res))
    this.formBuilder = new FormBuilder();
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.myForm = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'password': [null, [Validators.required]],
      'validate': ''
    });
    this.bg = {
      "token": '',
      "valid": ''
    };
  }

  ngOnInit() {
    // console.log(this.router);
    this.token = localStorage.getItem('access-token');
    if(this.token){
      this.router.navigate(['/program-catalog']);
    }
    this.redirectURL = '';
    if(this.router.url.length > 11){
      this.redirectURL = this.router.url.substring(11);
      console.log('redirect URL: '+this.redirectURL);
    }
    
    // if (this.route.snapshot.paramMap != null) {
    //   console.log(this.route.snapshot)
    //   this.urlfrom = this.route.snapshot.paramMap.get('name');
    // }
    // else this.urlfrom = "/content/home";

    // if(this.route.snapshot.paramMap.keys.length == 2){
    //   console.log("here");
    //     this.paramsLength = 2;
    //     this.routeParamOne = this.route.snapshot.paramMap.get('paramOne');
    //     this.routeParamTwo = this.route.snapshot.paramMap.get('paramTwo');
    // }
    // console.log(this.urlfrom)
    // if (this.urlfrom == null) this.urlfrom = "home"
  }

 
  onSubmit(eventDetails) {
    
    if(eventDetails.key=="Enter" || eventDetails.type=="click"){
      console.log("Entered");
   
    if (!this.myForm.valid) return;
    var data = this.myForm.value;
    this.httpClient.post(environment.apiBaseUrl + '/api/auth/login', data).subscribe(data => {
      this.bg = data;
      if(this.bg.valid=="admin"){
        window.location.href=environment.adminUrl+"/dashboard/?token="+this.bg.token;
        return;
   }
    this.errorress = "";
      // this.router.navigate(['/' + this.urlfrom]);
    }, 
    err => {
      this.errorress = "Wrong Email or Password"
    }, () =>{
      if(this.bg.valid=="admin"){return;}
        localStorage.setItem('access-token', this.bg.token);
        this.httpClient.get(environment.apiBaseUrl+'/api/user/id/?token='+this.bg.token).subscribe(data=>{
          this.userId = data['id'];
          // console.log("here->",this.userId);
          localStorage.setItem('id', data['id']+"");
          console.log(localStorage.getItem('id'));
        }, 
        err => {
          console.log("Error while getting token");console.log(err)
        },
        () => { //ON Successfull getting userID and storing it as local storage
        
          // console.log("hello");
          // console.log(this.userId);
          // if( ){
          //   var programId = this.enrolledPrograms[0].programID._id;
          //   this.router.navigate(['/' + this.urlfrom+'/'+programId]);
          // }
          if(this.redirectURL == '' || this.redirectURL == "/home"){
            this.router.navigate(['/program-catalog']);
          }
          else{
            this.router.navigate([this.redirectURL]);
          }
          // this.httpClient.get(environment.apiBaseUrl+'/api/program/get/enrolled_programs/'+this.userId+'/?token='+this.bg.token).subscribe(
          //   (data)=>{
          //   // console.log(data);
          //     this.enrolledPrograms = data[0]['enrollments'];
          //   }, 
          //   (err) => {console.log("Error while getting enrolled program");console.log(err)},
          //   () => {

              
          //   }
          // );
        }
      );
  });


  }

  }
}

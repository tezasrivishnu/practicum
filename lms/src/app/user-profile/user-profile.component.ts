import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RequestService } from 'projects/signup/src/app/request.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  token:any;
  formGroup: FormGroup;
  userData;
  userData_DOB;
  post;
  error = false;
  constructor(private httpClient: HttpClient,private request:RequestService, private formBuilder: FormBuilder,
    private router:Router) { 
    this.token=localStorage.getItem('access-token');
  }

  ngOnInit() {
    this.request.getData(this.token).subscribe(data => {
      this.userData = data;
      this.userData_DOB=this.userData.dateOfBirth.substring(0,10);
    });
    this.createForm();    
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          'address': ['', Validators.required],
          'emergencycontact': new FormControl(null, [Validators.required, Validators.pattern("[1-9]{1}[0-9]{9}")]),
          'alternateemail': ['', Validators.required]
        }),
        this.formBuilder.group({
          'linkedin': [''],
          'github': [''],
          'instagram': ['']
        }),
        this.formBuilder.group({
          'tenthschool': [null, Validators.required],
          'tenthmarks': new FormControl(null, [Validators.required, Validators.pattern('\\-?\\d*\\.?\\d{1,2}')]),
          'interschool': [null, Validators.required],
          'intermarks': new FormControl(null, [Validators.required, Validators.pattern('\\-?\\d*\\.?\\d{1,2}')]),
          'interstream': [null, Validators.required],
          'btechschool': [null, Validators.required],  
          'btechstream': [null, Validators.required],
          'btechmarks': new FormControl(null, [Validators.required, Validators.pattern('\\-?\\d*\\.?\\d{1,2}')])
        }),
        this.formBuilder.group({
          'workexperience': new FormControl(null, Validators.required),
          'company': ['']       
        })
      ])
    });
  }
  onSubmit({formArray}){
    if(!this.formGroup.valid){
      this.error = true;
      return;
    }
    this.error = false;
    var temp = Object.assign({},formArray[0],formArray[1],formArray[2]);
    this.post = {...temp};

    this.request.updateData(this.post,this.token);
    location.reload();
  }
}

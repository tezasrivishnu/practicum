import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ConstantPool } from '@angular/compiler';
import { MAT_CHECKBOX_CLICK_ACTION } from "@angular/material";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-course-invites',
  templateUrl: './course-invites.component.html',
  styleUrls: ['./course-invites.component.css']
})
export class CourseInvitesComponent implements OnInit {
  studentList: any;
  form: FormGroup;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute) { 
    localStorage.setItem("current-page","Invite Students")

   }

  ngOnInit() {
    this.form = this.formBuilder.group({
      studentList: new FormArray([])
    });
    this.httpClient.get(environment.apiBaseUrl + "/api/user/get/student-list?token="+localStorage.getItem('access-token')).subscribe(data => {
      this.studentList = data;
      this.addCheckBoxes();
      console.log(data);
    });
  }

  addCheckBoxes() {
    this.studentList.map((o, i) => {
      const control = new FormControl(i >= 0);
      // control.setValue(true);
      (this.form.controls.studentList as FormArray).push(control);
    });
  }

  onSubmit() {
    var finalArray = [];
    for (let index = 0; index < this.studentList.length; index++) {
      const student = this.studentList[index];
      if(this.form.value.studentList[index]) finalArray.push(student._id);
    }
    console.log(finalArray);
    this.httpClient.post(environment.apiBaseUrl+"/api/user/get/student-list/?token="+localStorage.getItem('access-token') + this.route.snapshot.params['instanceID'], finalArray).subscribe(data=>{
      console.log(data);
      
    })
  }
  selectToggle(){
    let temp=this.form.get('studentList') as FormArray;
    
    for(let index=0;index<temp.length;index++){
      temp.controls[index].setValue(!temp.controls[index].value);
    }
  }
  selectAll(){
    let temp=this.form.get('studentList') as FormArray;
    
    for(let index=0;index<temp.length;index++){
      temp.controls[index].setValue(true);
    }
  }
  unselectAll(){
    let temp=this.form.get('studentList') as FormArray;
    
    for(let index=0;index<temp.length;index++){
      temp.controls[index].setValue(false);
    }
  }
}

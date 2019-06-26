import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ManageCourseComponent } from "./manage-course/manage-course.component";

@Component({
  selector: 'app-manage-programs',
  templateUrl: './manage-programs.component.html',
  styleUrls: ['./manage-programs.component.css']
})
export class ManageProgramsComponent implements OnInit {
  programData;
  program_display;
  current_index;
  tobeadded = [];
  coursesNames:any;
  courseInstanceNames;
  modifyinstances={};

  constructor(private httpClient: HttpClient, private router: Router) {
    localStorage.setItem("current-page","Manage Programs")

   }

  ngOnInit() {
    this.httpClient.get(environment.apiBaseUrl + "/api/program/get/all-programs?token="+localStorage.getItem('access-token')).subscribe(data => {
      this.programData = data;
      if (this.programData) this.programData = this.programData.reverse();
      console.log(this.programData)
    });
  }
  addCourse(){
    console.log(this.program_display)
    this.router.navigate(["add/"+this.program_display._id]);
      
  }
  view(program, i) {
    this.program_display = program;
    this.current_index = i;
    console.log(this.program_display);
    this.httpClient.post(environment.apiBaseUrl+"/api/course/get/course-names?token="+localStorage.getItem('access-token'), this.program_display.curriculum).subscribe(data=>{
      console.log(data);
      this.coursesNames = data
    }, (error)=>console.log(error),
    () => console.log(this.coursesNames)
    );
    this.httpClient.post(environment.apiBaseUrl+"/api/course-instance/get/courseInstance-names?token="+localStorage.getItem('access-token'), this.program_display.curriculum).subscribe(data=>{
      console.log(data);
      this.courseInstanceNames = data
    }, (error)=>console.log(error),
    () => console.log(this.courseInstanceNames)
    );
    // console.log(i)
  }

  sub() {
    console.log(this.programData)
    console.log(this.tobeadded)
    this.httpClient.post(environment.apiBaseUrl + "/api/course/update/catalog?token="+localStorage.getItem('access-token'), this.tobeadded).subscribe(data => {
      console.log(data)
    });
  }

  clearFilter() {
    if (this.tobeadded.indexOf(this.program_display) == -1) {
      this.tobeadded.push(this.program_display)
    }
    console.log(this.tobeadded)
  }
  update(event){
    if(event._id ){
    this.modifyinstances[event._id]=event.isLive;}
  }
persist(){
  console.log(this.modifyinstances);
  this.httpClient.post(environment.apiBaseUrl+"/api/course-instance/status/update?token="+localStorage.getItem("access-token"),this.modifyinstances).subscribe(data=>{
    console.log(data)
  })
}
}

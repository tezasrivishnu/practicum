import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modify-course-catalog',
  templateUrl: './modify-course-catalog.component.html',
  styleUrls: ['./modify-course-catalog.component.css']
})
export class ModifyCourseCatalogComponent implements OnInit {
  courseData;
  course_display;
  current_index;
  tobeadded=[];
  
  constructor(private httpClient: HttpClient) { 
    localStorage.setItem("current-page","Modify Course Catalog")

   }

  ngOnInit() {
    this.httpClient.get(environment.apiBaseUrl+"/api/course/get/catalog?token="+localStorage.getItem('access-token')).subscribe(data=>{
      this.courseData=data;
      if (this.courseData) this.courseData = this.courseData.reverse();
      console.log(this.courseData)
    })
   
    // this.courseData = [{ "cid": 1, "isAlive": true }, { "cid": 11, "isAlive": true }, { "cid": 111, "isAlive": true }]
  }
  togglealive() {

    this.course_display.isAlive = !this.course_display.isAlive;
    if(this.tobeadded.indexOf(this.course_display)==-1){
      this.tobeadded.push(this.course_display)
    }
    console.log(this.tobeadded)
  }
  view(course, i) {
    this.course_display = course;
    this.current_index = i;
    

    // console.log(i)
  }
  sub(){
    console.log(this.courseData)
    console.log(this.tobeadded)
    this.httpClient.post(environment.apiBaseUrl+"/api/course/update/catalog?token="+localStorage.getItem('access-token'),this.tobeadded).subscribe(data=>{
      console.log(data)
    })
  }
  newemptycourse(){
    let dummy={
      "courseID":'Empty ID',
      "courseName":'Empty course',
      "courseDescription":'EmptyDesc',
      "isAlive":false
    }
    this.courseData.unshift(dummy);
    this.tobeadded.push(this.courseData[0]);
    this.course_display=this.courseData[0];
    
  }
  clearFilter(){
    
    
    if(this.tobeadded.indexOf(this.course_display)==-1){
      this.tobeadded.push(this.course_display)
    }
    console.log(this.tobeadded)
  }
}

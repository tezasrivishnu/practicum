import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { CdkDragDrop, moveItemInArray, transferArrayItem,CdkDrag } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  program_id;
  availableCourses;
  coursesAssigned;
  dupCoursesAssigned;
  isLinear = false;

  constructor(private route:ActivatedRoute,private httpClient:HttpClient,private router: Router) { 
   this.program_id =this.route.snapshot.params['program_id'];
   console.log(this.program_id)
   this.availableCourses = [];
    this.coursesAssigned = [];
    this.dupCoursesAssigned=[];


   }

  ngOnInit() {
    this.httpClient.get(environment.apiBaseUrl+"/api/program/courses/get?token="+localStorage.getItem('access-token')).subscribe(data=>{
      this.availableCourses=data;
      
    })
    
   
    this.httpClient.get(environment.apiBaseUrl+"/api/program/get/curriculum/"+this.program_id+"?token="+localStorage.getItem('access-token')).subscribe(data=>{
      
      this.coursesAssigned=data;
      this.dupCoursesAssigned=data;

         
    })
    
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(this.availableCourses)
      console.log(event.previousIndex)
      console.log(this.availableCourses[event.previousIndex])
      if(this.find(this.availableCourses[event.previousIndex])){
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }}
   
  }
  onSubmit(){

  }
  find(obj){
    console.log(obj)
    for(let index =0;index<this.coursesAssigned.length;index++){
      if(obj._id==this.coursesAssigned[index]._id)return false
    }
    return true
  }
  evenPredicate(item: CdkDrag<object>) {
    // console.log(item.data)
    // let k=item.data;
    // console.log(this.dupCoursesAssigned)
    // for(let i=0;i<this.coursesAssigned.length;i++){
    //   if(k._id==this.coursesAssigned[i]._id)return false;
    // }
    
    return true;
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }
  submitStepper(){
   
    
    this.httpClient.post(environment.apiBaseUrl+'/api/program/update/'+this.program_id+"?token="+localStorage.getItem('access-token'), this.coursesAssigned).subscribe(data=>{
      console.log(data);
    },()=>{
      console.log('Error');
    }, ()=>{
      this.router.navigate(['/']);
    });
  }


}

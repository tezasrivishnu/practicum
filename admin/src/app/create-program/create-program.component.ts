import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-program',
  templateUrl: './create-program.component.html',
  styleUrls: ['./create-program.component.css']
})
export class CreateProgramComponent implements OnInit {
  availableCourses : any;
  coursesAssigned : any;
  tempObjectsList : any;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    console.log(this.availableCourses);
    console.log(this.coursesAssigned);
  }

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private router: Router) {
    localStorage.setItem("current-page","Create Program")

    this.availableCourses = [];
    this.coursesAssigned = [];
   }

  ngOnInit() {
    this.httpClient.get(environment.apiBaseUrl+"/api/program/courses/get?token="+localStorage.getItem('access-token')).subscribe(data=>{
      this.tempObjectsList = data;
    }, ()=>{
      console.log('Error in retreiving the courses');
    }, ()=>{
      this.tempObjectsList.forEach(course => {
        this.availableCourses.push(course);
      });
      console.log(this.availableCourses);
    });

    this.firstFormGroup = this.formBuilder.group({
      programName: ['', Validators.required],
      programDescription: ['', Validators.required]
    });
  }

  submitStepper(){
    var programCourses = [];
    console.log(this.coursesAssigned);
    this.coursesAssigned.forEach(course => {
      course["instances"] = [];
      programCourses.push(course);
    });
    var data = {
      programName: this.firstFormGroup.value.programName,
      programDescription:this.firstFormGroup.value.programDescription,
      curriculum: programCourses
    }
    this.httpClient.post(environment.apiBaseUrl+"/api/program/create?token="+localStorage.getItem('access-token'), data).subscribe(data=>{
      console.log(data);
    },()=>{
      console.log('Error');
    }, ()=>{
      if(data) this.router.navigate(['/']);
    });
  }

}

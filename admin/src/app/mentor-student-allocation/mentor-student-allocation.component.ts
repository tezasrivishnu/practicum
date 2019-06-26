import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mentor-student-allocation',
  templateUrl: './mentor-student-allocation.component.html',
  styleUrls: ['./mentor-student-allocation.component.css']
})
export class MentorStudentAllocationComponent implements OnInit {
  loading = false;
  batchesData: any;
  programs: any;
  courses: any;
  courseInstances: any;
  batchesForm: FormGroup;
  curriculum: any;
  courseInstanceID: any;
  programID: any;
  courseID: any;
  dropZoneDisplay = false;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.httpClient.get(environment.apiBaseUrl + "/api/program/get/all-programs?token="+localStorage.getItem('access-token')).subscribe(data => {
      console.log(data);
      this.programs = data;
    });
    this.batchesForm = this.formBuilder.group({
      programName: [[], Validators.required],
      courseName: [{ value: '', disabled: true }, Validators.required],
      courseInstanceID: [{ value: '', disabled: true }, Validators.required]
    });
    this.onChanges();
  }

  loadingSwitch(event) {
    this.loading = event;
  }

  loadData(event) {
    console.log('In loadData');
    console.log(event);
    this.batchesData = event;
  }

  onChanges() {
    this.batchesForm.get('programName').valueChanges.subscribe(val => {
      if (val) {
        this.programID = val;
        console.log(val);
        this.httpClient.get(environment.apiBaseUrl + "/api/course-instance/courses/get/"+val+"?token="+localStorage.getItem('access-token')).subscribe(data=>{          
          this.curriculum = data[0].curriculum;
        }, (err)=>console.log(err),
        ()=> {
          console.log(this.curriculum);
          this.httpClient.post(environment.apiBaseUrl + "/api/course/get/course-names?token="+localStorage.getItem('access-token'), this.curriculum).subscribe(data=>{
            console.log(data);
            this.courses = data;
          });
        });
        this.batchesForm.controls['courseName'].enable();
      };
    });

    this.batchesForm.get('courseName').valueChanges.subscribe(val=>{
      if(val){
        console.log(val);
        this.courseID = val;
        console.log(this.programs);
        let programCurriculum;
        this.programs.forEach(program => {
          if (program._id == this.batchesForm.controls['programName'].value) programCurriculum = program.curriculum;
        });
        console.log(programCurriculum);
        programCurriculum.forEach(course => {
          if (course._id == this.batchesForm.controls['courseName'].value) this.courseInstances = course.courseInstances;
        });
        this.batchesForm.controls['courseInstanceID'].enable();
        console.log(this.courseInstances);
        var curriculumJSON = {};
        curriculumJSON["courseInstances"] = this.courseInstances;
        console.log(curriculumJSON);
        curriculumJSON=Array(curriculumJSON)
        this.httpClient.post(environment.apiBaseUrl+"/api/course-instance/get/courseInstance-names?token="+localStorage.getItem('access-token'), curriculumJSON).subscribe(data=>{
          console.log(data);
          this.courseInstances=data[0];
        })
      }
    });

    this.batchesForm.get('courseInstanceID').valueChanges.subscribe(val=>{
      if(val){
        this.courseInstanceID = val;
        this.dropZoneDisplay= true;
      }
    });
  }

}

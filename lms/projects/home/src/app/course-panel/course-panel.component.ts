import { Component, OnInit, Input, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatInputModule } from '@angular/material';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { HomeserService } from '../homeser.service';
import { tokenKey } from '@angular/core/src/view';
// import {FormsModule} from '@angular/forms';
// import { DialogOverviewExampleDialog } from '../program-home/program-home.component';


@Component({
  selector: 'app-course-panel',
  templateUrl: './course-panel.component.html',
  styleUrls: ['./course-panel.component.css']
})
export class CoursePanelComponent implements OnInit {
  
  
  @Input() courseDetails;
  selectedCourseInstance: string;
  programId: string;
  environment:object;
  animal:String;
  courseIncharges: string[];
  checkMentor:boolean;
  userId:string;
  userRole: string;
  token: string;
  assertsPath:string;

  constructor(private router: Router,private dialog: MatDialog, private route:ActivatedRoute, private homeService: HomeserService) { }

  ngOnInit() {
    this.selectedCourseInstance='';
    console.log(this.courseDetails);
    this.checkMentor= false;
    this.assertsPath = environment.globals.assets;
    // this.courseIncharges = this.courseDetails.courseInstances.courseInstructor;
    this.environment = environment;
    this.userId = localStorage.getItem('id');
    this.token = localStorage.getItem('access-token');
    this.programId = this.route.snapshot.params.programId;
    // console.log(this.courseIncharges.includes(this.userId));
    
    // if(this.courseIncharges.includes(this.userId)){
    //   this.checkIncharge = true;
    // }
    this.homeService.getRole(this.token).subscribe((data)=>{
      this.userRole = data['role'];
    },err => {console.log("Error while getting role",err);
    }, ()=>{
      if(this.userRole == 'mentor'){
        this.checkMentor = true;
      }
    });
  }

  onClick(){
    console.log(this.selectedCourseInstance);
    
    this.router.navigate(['/studytable/courses/'+this.programId+'/'+this.selectedCourseInstance, {courseId : this.courseDetails.courseID._id}]);
   // mat-button routerLink="/studytable/courses/{{selectedCourseInstance}}"
  }
  openDialog():void{
    this.dialog.open(PublishContentDialog, {
      width: '700px',
      height:'450px',
      data: {courseDetails: this.courseDetails, userId: this.userId}
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class PublishContentDialog implements OnInit {

  courseInstanceID:String;
  repoLink:string;
  apiKey:string;
  commitID:string;
  courseDetails : any;
  token:string;
  isLive:boolean;
  checkInchargeManageContent: boolean;
  checkInchargeControlSubmission: boolean;
  courseInstancesList: any[];
  modifiedStatusFromDb:boolean;
  constructor(
    private dialogRef: MatDialogRef<PublishContentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private homeService: HomeserService)
  { }
    publishContentForm : FormGroup;
    controlSubmissionsForm: FormGroup; 
  ngOnInit() {
    this.modifiedStatusFromDb = false;
    this.checkInchargeManageContent = null;
    this.checkInchargeControlSubmission = null;
    this.token = localStorage.getItem('access-token');
    this.courseDetails = this.data.courseDetails;
    this.courseInstancesList = this.courseDetails.courseInstances;
    // this.courseInstanceID = this.data.courseDetails.courseInstances[0]._id;
    this.isLive = this.data.courseDetails.courseInstances[0].isLive;

    this.publishContentForm = this.formBuilder.group({
      'courseInstanceID' : [this.courseInstanceID,[Validators.required]],
      'repoLink':[this.repoLink,[Validators.required]],
      'commitID':[this.commitID,[Validators.required]],
      'apiKey':[this.apiKey,[Validators.required]],
    });

    this.controlSubmissionsForm = this.formBuilder.group({
      'courseInstanceID': [this.courseInstanceID,[Validators.required]],
      'isLive': [this.isLive, [Validators.required]]
    });

  }

  checkInchargeForManageContent(ev){
    if(ev.value == "none"){
      this.checkInchargeManageContent = null;
    }
    
    this.courseInstancesList.forEach(obj => {
      if(obj._id == ev.value){
        if(obj.courseIncharge.includes(this.data.userId)){
          this.checkInchargeManageContent = true;
          return;
        }
        else{
          this.checkInchargeManageContent = false;
        }
      }
    });
    // console.log(ev);
    // console.log(this.checkInchargeManageContent);
    // console.log(this.checkInchargeManageContent == false);
    
  }


  checkInchargeForControlSubmission(ev){
    this.modifiedStatusFromDb =false;
    if(ev.value == "none"){
      this.checkInchargeControlSubmission = null;
    }
    
    this.courseInstancesList.forEach(obj => {
      if(obj._id == ev.value){
        if(obj.courseIncharge.includes(this.data.userId)){
          this.checkInchargeControlSubmission = true;
          this.isLive = obj.isLive;
          return;
        }
        else{
          this.checkInchargeControlSubmission = false;
        }
      }
    });
    // console.log(ev);
    // console.log(this.checkInchargeControlSubmission);
    // console.log(this.checkInchargeControlSubmission == false);
    
  }

  isLiveToggleChange(){
    this.modifiedStatusFromDb =false;
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    console.log(this.publishContentForm);
    this.homeService.publishContent(this.publishContentForm.value,this.token).subscribe((data)=>{
      console.log("ACK -> ", data);
    },(err)=>{
      console.log("error while publishing the content");
      console.log(err);
    },()  => { 
      console.log("publish content completed successfully");
    });
  }

  onSubmitControlSubmission(){
    this.modifiedStatusFromDb = false;
    console.log(this.controlSubmissionsForm);
    var tempCourseInstanceID = this.controlSubmissionsForm.value.courseInstanceID;
    var isLive = String(this.controlSubmissionsForm.value.isLive);
    var data = {};
    data[tempCourseInstanceID]= isLive;
    console.log(data);
    
    this.homeService.postCourseInstanceIsLiveStatus(data,this.token).subscribe((data:boolean)=>{
      var temp = data;
      console.log("Insided postCourseInstanceIsLiveStatus");
      
      console.log(data);
      this.modifiedStatusFromDb = temp;
    });
  }

}

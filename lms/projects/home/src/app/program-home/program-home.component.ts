import { Component, OnInit , Inject} from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HomeserService } from "../homeser.service";
import { Router, ActivatedRoute } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { SharedService } from 'src/app/shared.service';
import { environment } from 'src/environments/environment';
import { FormControl, Validators } from '@angular/forms';
import{MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-program-home',
  templateUrl: './program-home.component.html',
  styleUrls: ['./program-home.component.css']
})
export class ProgramHomeComponent implements OnInit {

  dcards:object;
  environment;
  dcards$:Observable<object>;
  bcards
  token;
  flag=false;
  username;
  userId: String;
  programId: any;
  courses: any;
  programContent:any;
  testing: BehaviorSubject<any>;
  courseForm: FormControl; 
  selectedCourseInstance: String;
  programName: string;


  
  constructor(private homeService:HomeserService,private router:Router, private sharedService: SharedService, private route: ActivatedRoute) {
    this.token=localStorage.getItem('access-token');
    this.programName = localStorage.getItem('program-name');
    this.userId = localStorage.getItem('id');
    this.programId = this.route.snapshot.params.programId;
    this.testing = new BehaviorSubject('Loading Program Description');
    this.testing.asObservable();

    // console.log(this.programId);
    if(this.token==null){   
      console.log("oreoooooo");this.flag=false;
      this.router.navigate(['/auth/login/home/'+this.programId])
    }
    if(this.programName == null){
      this.homeService.getProgramName(this.programId, this.token).subscribe(
        (data) => { this.programName = data['programName'] },
        (error) => { console.log(" error while getting program name");console.log(error);},
        () => {localStorage.setItem('program-name',this.programName)}
      );
    }
  }


  ngOnInit() {
    this.courseForm = new FormControl('',[Validators.required]);
    this.programContent = "Loading Program Content";
    this.environment = environment;
    const tok=localStorage.getItem('access-token');
    
    // console.log(tok)
    if(tok){
      var decoded = jwt_decode(tok);
      this.username=decoded.email;
      // console.log(decoded);
      this.getCourses(this.userId, this.programId);
    }
    // else{
    //   this.router.navigate(['/auth/login/home'])
    // }

    
    
    this.homeService.getdata2(tok);
   
    this.homeService.d2.subscribe(d=>{
      this.dcards=d;
      // console.log(this.dcards)
      if(this.dcards['status']==401){this.flag=false;this.dcards=null;this.router.navigate(['/auth/login/home'])}
      else{
        this.flag=true;
        this.bcards=d['courses'];
        this.sharedService.titleChange(d['name']);
        if(this.bcards!=null){
          this.bcards= this.bcards.sort((a,b)=>a.id<b.id? -1:1);
        }
        
        // console.log(this.dcards["courses"])
        }
      }
    )
  }

  getCourses(userId:String, programId:String){
    this.homeService.getCoursesCatalog(userId, programId, this.token).subscribe( (data) => {
      this.courses = data['courses'];
      this.programContent = data['programID'];
      // console.log(this.courses);
      this.courses.forEach(d => {
        console.log(d.courseID.courseName);
        
      });
    });
  }

  log(){
 
    
    localStorage.removeItem('access-token');
    this.router.navigate(['/auth/login/home'])
  }

 
}




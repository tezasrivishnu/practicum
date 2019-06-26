import { Component, OnInit } from '@angular/core';
import { HomeserService } from "../homeser.service";
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';

@Component({
  selector: 'app-program-catalog',
  templateUrl: './program-catalog.component.html',
  styleUrls: ['./program-catalog.component.css']
})
export class ProgramCatalogComponent implements OnInit {

  enrolledPrograms: any[];
  token: any;
  userId:  string;
  constructor(private homeService: HomeserService, private router: Router) { }

  ngOnInit() {
    localStorage.removeItem('program-name');
    this.enrolledPrograms = [];
    this.token = localStorage.getItem("access-token");

    if(!this.token){
      this.router.navigate(['/auth/login/program-catalog'])
    }
    this.userId = localStorage.getItem("id");
    // this.enrolledPrograms = ["MSIT","Innosential"];
    this.getUserEnrolledPrograms(this.userId);
  }

  getUserEnrolledPrograms(userId:string){
    this.homeService.getPrograms(userId,this.token).subscribe((data: any)=>{
      // console.log(data);
      var temp = [];
      temp = data[0]["enrollments"];
      
      temp.forEach(enrollment => {
        // console.log("hello")
        // console.log(enrollment.programID);
    
        this.enrolledPrograms.push(enrollment.programID);
      });
    },error => {console.log(error);
    },() =>{
      if(this.enrolledPrograms.length == 1){
        localStorage.setItem('program-name', this.enrolledPrograms[0].programName);
        this.goToProgramHome(this.enrolledPrograms[0]._id, 0);
      }
      // console.log(this.enrolledPrograms);
    });
  }

  goToProgramHome(programId: String, index: number){
    // console.log("programID: ",programId);
    localStorage.setItem('program-name', this.enrolledPrograms[index].programName);
    this.router.navigate(['/home/'+programId]);
    return;
  }



}

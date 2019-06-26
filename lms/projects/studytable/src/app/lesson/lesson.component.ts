import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';

import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { MatSidenav } from '@angular/material';

import { ActivatedRoute, Router } from '@angular/router';
import { LessonActivitiesService } from '../lesson-activities.service';

import { Activity } from '../activity'
import { ActivityContent } from '../activity-content';

import { Location } from '@angular/common';
import { LessonService } from '../lesson.service';
import { Lesson } from '../lesson';


@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnDestroy, AfterViewInit {

  @ViewChild('snav') public snav: MatSidenav;

  lessonName: string;
  courseInstanceId: string;
  lessonId: string;
  activities: Activity[];
  content: ActivityContent[];
  clickedItem: string;
  activityId: string; //for acitvity response
  token: string;
  

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private route: ActivatedRoute, private activityService: LessonActivitiesService,
    private location: Location, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

  ngOnInit(): void {
    this.clickedItem = null;
    this.token = localStorage.getItem('access-token');
    if(this.token == null){
      console.log('token is null');
        this.router.navigate(['/auth/login']); //TODO add redirect parameter to app-routing module
        return;
    }
    // console.log(this.route.snapshot.params.courseInstanceId);
    this.courseInstanceId = this.route.snapshot.params.courseInstanceId;
    this.lessonId = this.route.snapshot.params.lessonId;
    console.log("inside lesson component");
    // call the service to get all the activities
    this.getActivities(this.courseInstanceId,this.lessonId);
    // console.log(this.content);
    // console.log(this.activities);
    
  }

  ngAfterViewInit(): void {
  }

  getActivities(courseInstanceId:string, lessonId:string) {
    // console.log("hyuouo");
    
    var allLesson: Lesson[];
    // console.log(this.activityService.getActivities(courseInstanceId,lessonId));
    this.activityService.getActivities(courseInstanceId,lessonId).subscribe((data)=>{
      this.activities = data;
      console.log(this.activities);
    }, error => {console.log(error);
    }, () => this.showContent(0));
  }

  showContent(id: number) {
    
    this.content = this.activities[id].activity_json;
    this.activityId = this.activities[id].activity_id;
    console.log("Inside Show content");
    console.log(this.content);
    this.clickedItem = this.activities[id].activity_name;
    // console.log(this.activities);
    
  }

  getURL(videoID) {
    return `https://www.youtube.com/embed/${videoID}?rel=0`;
  }

}

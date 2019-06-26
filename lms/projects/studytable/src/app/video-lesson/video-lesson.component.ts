import { Component, OnInit, Input, SecurityContext } from '@angular/core';

@Component({
  selector: 'app-video-lesson',
  templateUrl: './video-lesson.component.html',
  styleUrls: ['./video-lesson.component.css']
})
export class VideoLessonComponent implements OnInit {

  @Input() videoID: string;
  videoURL: string;

  constructor() {
    
  }

  ngOnInit() {
    this.videoURL = `https://www.youtube.com/embed/${this.videoID}?rel=0`
  }
}

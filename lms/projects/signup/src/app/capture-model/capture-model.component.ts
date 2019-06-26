import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import * as faceapi from 'face-api.js';

@Component({
  selector: 'app-capture-model',
  templateUrl: './capture-model.component.html',
  styleUrls: ['./capture-model.component.css']
})
export class CaptureModelComponent implements OnInit {

  check:boolean;
  track:any;

  
  @ViewChild("inputVideo")
  public video: ElementRef;

  @ViewChild("overlay")
  public canvas: ElementRef;
  public capture: any;
  modalTitle: string;

  constructor(
      public dialogRef: MatDialogRef<CaptureModelComponent>, 
      private snackBar: MatSnackBar, 
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.modalTitle = data.title;
    this.check = false;
  }

  public ngOnInit() { 
    this.run();
  }

  close() {
    if (!this.check) {
      this.snackBar.open('image invalid', '', {
        duration: 2000,
      });
      return;
    }
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.data.capture = this.canvas.nativeElement.toDataURL("image/png");
    this.track.stop();
    this.dialogRef.close(this.data.capture);
  }

   resizeCanvasAndResults(dimensions, canvas, results) {
    const { width, height } = dimensions instanceof HTMLVideoElement
      ? faceapi.getMediaDimensions(dimensions)
      : dimensions;
    canvas.width = width;
    canvas.height = height;
    return faceapi.resizeResults(results, { width, height });
  }
  
  drawDetections(dimensions, canvas, detections) {
    const resizedDetections = this.resizeCanvasAndResults(dimensions, canvas, detections);
    faceapi.drawDetection(canvas, resizedDetections, { withScore: false });
  }
  
  async run() {
    await faceapi.loadTinyFaceDetectorModel('assets/models');
    console.log(faceapi.nets);
    const videoEl = <HTMLVideoElement> document.getElementById('inputVideo');
    navigator.getUserMedia(
      { video: {} },
      stream => {
        videoEl.srcObject = stream;
        this.track = stream.getTracks()[0]; 
      },
      err => console.error(err)
    );
  } 
  
  async onPlay() {
    const videoEl:HTMLVideoElement = this.video.nativeElement;
    const result = await faceapi.detectSingleFace(videoEl, new faceapi.TinyFaceDetectorOptions());
    if (result) {
      this.check = true;
      this.drawDetections(videoEl, this.canvas.nativeElement, [result]); 
    }
    else {
      this.check = false;
    }
    setTimeout(() => this.onPlay());
  }

}

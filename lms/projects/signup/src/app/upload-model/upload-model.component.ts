import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-upload-model',
  templateUrl: './upload-model.component.html',
  styleUrls: ['./upload-model.component.css']
})
export class UploadModelComponent implements OnInit {

  fileSelected:File;
  modalTitle:String;
  constructor(
      public dialogRef: MatDialogRef<UploadModelComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private snackBar: MatSnackBar
    ) {
    this.modalTitle = data.title;
  }

  ngOnInit() {
  }

  onFileSelected(target){
    this.fileSelected = target.target.files[0];
  }

  upload(){
    if(this.fileSelected!=null)
    {
      var reader:FileReader = new FileReader();
      var dialogRef = this.dialogRef;
      reader.onload = function(e:any) {
        dialogRef.close(e.target.result);
      };
      reader.readAsDataURL(this.fileSelected)
    } 
    else this.snackBar.open('image not uploaded', '', {
      duration: 2000,
    });
 }

}

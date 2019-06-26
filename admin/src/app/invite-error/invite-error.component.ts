import { Component, OnInit } from '@angular/core';
import { StatusService } from '../status.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-invite-error',
  templateUrl: './invite-error.component.html',
  styleUrls: ['./invite-error.component.css']
})
export class InviteErrorComponent implements OnInit {
  errorData: any;
  error: string = "";
  constructor(private statusService: StatusService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.statusService.errorList.subscribe(data =>{
      this.error = "";
      for (let index = 0; index < data.length; index++) {
        const errorLine = data[index];
        if (index < data.length-1) this.error += errorLine+"\n";
        else this.error += errorLine;
      }
    });
  }

  copyInputText(inputElement: HTMLInputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.openSnackBar();
  }

  openSnackBar() {
    this.snackBar.open("Text Copied !!!", "Dismiss" ,{ duration: 1000})
  }

}

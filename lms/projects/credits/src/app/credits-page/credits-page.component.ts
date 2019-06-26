import { Component, OnInit, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-credits-page',
  templateUrl: './credits-page.component.html',
  styleUrls: ['./credits-page.component.css']
})
export class CreditsPageComponent implements OnInit {

  constructor() { }
  @Input() dataItem: any;
  @Input() index: any;
  i = 0;
  txt: string; /* The text */
  speed = 150; /* The speed/duration of the effect in milliseconds */

  
  ngOnInit() {
      this.txt = this.dataItem.name
      var refreshIntervalId = setInterval(() => {
        if (!document.getElementById("typing"+this.index)) return;
        if (this.i < this.txt.length) {
          document.getElementById("typing"+this.index).innerHTML += this.txt.charAt(this.i);
          this.i++;
        }
        else{
          clearInterval(refreshIntervalId);
        }
      }, this.speed);
  }

}

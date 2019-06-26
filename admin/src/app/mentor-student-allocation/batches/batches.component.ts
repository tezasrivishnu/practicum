import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit {
  @Input() batchesData: any;
  validData: any;
  invalidData: any;
  displayedColumns: string[] = ['Student Rollnumber', 'Student Email', 'Mentor Email', 'Status'];
  dataSource: any;


  constructor() { }

  ngOnInit() {
    this.validData = this.batchesData.validData;
    this.invalidData = this.batchesData.invalidData;
    // this.dataSource = this.invalidData;
  }
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  @Input() title: string;
  @Input() text: string;
  constructor() { }

  ngOnInit() {
  }

}

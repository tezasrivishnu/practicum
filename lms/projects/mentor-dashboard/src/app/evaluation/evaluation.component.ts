import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MentorRequestService } from '../mentor-request.service';
@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  formGroup: FormGroup;
  courses;
  constructor(
    private formBuilder: FormBuilder,
    private mrService: MentorRequestService
    ) { }

  ngOnInit() {
    this.createForm();
    
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'marks': [null, Validators.required],
      'feedback': [null, Validators.required]
    });
  }

}

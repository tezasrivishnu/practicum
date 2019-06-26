import { Directive, HostListener, HostBinding, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {
  @Output() loadingStatus = new EventEmitter();
  @Output() batchesData = new EventEmitter();
  @Input() courseInstanceID: any;
  @Input() programID: any;
  @Input() courseID: any;
  data: any;

  @HostBinding('style.background') private background = '#eee';

  constructor(private httpClient: HttpClient) { }

  @HostListener('dragover', ['$event']) public onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee'
  }

  @HostListener('drop', ['$event']) public onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    this.loadingStatus.emit('true');
    let files = evt.dataTransfer.files;
    console.log(files);
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append("csv[]", files[i], files[i]['name']);
    };
    console.log(this.courseInstanceID._id);
    this.httpClient.post(environment.apiBaseUrl + "/api/course-instance/update/batch/"+this.programID+"/"+this.courseID+"/"+this.courseInstanceID._id+"?token="+localStorage.getItem('access-token'), formData).subscribe(data => {
      // console.log(data);
      this.data = data;
    }, (err)=> console.log(err),
    ()=> {
      this.loadingStatus.emit('');
      this.batchesData.emit(this.data);
    });
  };
}

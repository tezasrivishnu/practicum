import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private titleSource = new BehaviorSubject<string>("");
  title = this.titleSource.asObservable();

  constructor() { }

  titleChange(newTitle: string){
    this.titleSource.next(newTitle);
  }
}

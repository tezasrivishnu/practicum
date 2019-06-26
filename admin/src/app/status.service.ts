import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private tempUsersData = [];
  private tempErrorList: string[] = [];
  data: any;

  private dataSource = new BehaviorSubject<Array<User>>(this.tempUsersData);
  successList = this.dataSource.asObservable();

  private errorListSource = new BehaviorSubject<Array<string>>(this.tempErrorList);
  errorList = this.errorListSource.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading = this.loadingSubject.asObservable();


  constructor(private httpClient: HttpClient) { }

  updateErrorList(errorDataList: string[]){
    this.tempErrorList = errorDataList;
    this.errorListSource.next(errorDataList);
  }


  updateSuccessList(){
    this.dataSource.next(this.tempUsersData);
  }

  toDB(successDataList: any){
    const finalSuccessDataList = [];
    loop1: for (let index = 0; index < successDataList.length; index++) {
      const newUser = successDataList[index];
      loop2: for (let index2 = 0; index2 < this.tempUsersData.length; index2++) {
        const oldUser = this.tempUsersData[index2];
        console.log(oldUser);
        if ( (newUser.userID == oldUser.userID || newUser.email == oldUser.email) && oldUser.status!="Mail failed" ) {
          console.log('Duplicate detected');
          continue loop1;
        }
      }
      finalSuccessDataList.push(newUser);
    }
    if(finalSuccessDataList.length>0){
      this.loadingSubject.next(true);
      this.httpClient.post(environment.apiBaseUrl+"/api/invites/bulk-invite?token="+localStorage.getItem('access-token'), finalSuccessDataList).subscribe(
      data=> this.data = data,
      error=> console.log(error),
      () => {
        this.tempUsersData = this.data;
        this.updateSuccessList();
        this.loadingSubject.next(false);
      });
    }
  };

  initialLoad(){
    this.httpClient.get(environment.apiBaseUrl+"/api/invites/get-data?token="+localStorage.getItem('access-token')).subscribe(
      data=> this.data = data,
      error=> console.log(error),
      () => {
        this.tempUsersData = this.data;
        this.updateSuccessList();
      }
    );
  }

  errorDataCheck(){
    if (this.tempErrorList.length>0) return true;
    else return false;
  }
}

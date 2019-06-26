import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(usersData: any, searchTerm: any): any {
    if (searchTerm == null) return usersData;
    return usersData.filter(function(userData){
      return userData.email.toLowerCase().includes(searchTerm.toLowerCase())
    });
  }

}

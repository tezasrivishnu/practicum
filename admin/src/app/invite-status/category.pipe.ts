import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(usersData: any, selectedCategory: any): any {
    if (selectedCategory == null) return usersData;
    return usersData.filter(function(userData){
      return userData.status.toLowerCase().includes(selectedCategory.toLowerCase())
    });
  }

}

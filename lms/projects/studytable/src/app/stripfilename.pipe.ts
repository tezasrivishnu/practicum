import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripfilename'
})
export class StripfilenamePipe implements PipeTransform {

  transform(value: string): string {
    console.log(value);
    return value.split("/").pop();
  }

}

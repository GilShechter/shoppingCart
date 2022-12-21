import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], keyWord: string): any[] {
    const resultArray: any = [];
    if (!value || keyWord==='') return value;
    value.forEach((item:any) => {
      if (item.title.trim().toLowerCase().includes(keyWord.toLowerCase())) {
        resultArray.push(item);
      }
    })
    return resultArray;
  }

}

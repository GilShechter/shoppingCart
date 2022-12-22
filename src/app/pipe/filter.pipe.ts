import { Pipe, PipeTransform } from '@angular/core';

/**
 * Filters products by title
 * Gets a key words from the search bar, iterates over the products
 * and returns only the products that include the key word
 * 
 * @param value - the products array
 * @param keyWord - the key word to search
 * @returns the filtered products array
 */
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

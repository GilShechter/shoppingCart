import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

/**
 * Gets the products from the fake store api
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  /**
   * Gets the products from the fake store api
   * 
   * @returns the products array
   */
  getProducts(){
    return this.http.get<any>('https://fakestoreapi.com/products/')
    .pipe(map((res:any) => {
      return res;
    }))
  }
}

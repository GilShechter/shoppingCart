import { Firestore, doc, collection } from '@angular/fire/firestore';
import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any = []
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor(private usersService : UsersService, private firestore : Firestore) { }

  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  getTotalPrice() : number {
    let totalPrice = 0;
    this.cartItemList.map((item:any) => {
      totalPrice += item.total;
    })
    return totalPrice;
  }

  addToCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    this.usersService.updateUser(this.cartItemList);
  }

  removeCartItem(product : any){
    this.cartItemList.map((item:any, index:any) => {
      if(item.id === product.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    this.usersService.updateUser(this.cartItemList);
  }

  removeAllCart(){
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    this.usersService.updateUser(this.cartItemList);
  }

}

import { Firestore, doc, collection } from '@angular/fire/firestore';
import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Cart service
 */
@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any = []
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor(private usersService : UsersService, private firestore : Firestore) { }

  /**
   * Get a list of products
   */
  getProducts(){
    return this.productList.asObservable();
  }

  /**
   * Adds a product to the cart
   * 
   * @param product - product to add
   */
  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  /**
   * Gets the total price of the cart
   * 
   * @returns {number} - the total price of the cart
   */
  getTotalPrice() : number {
    let totalPrice = 0;
    this.cartItemList.map((item:any) => {
      totalPrice += item.total;
    })
    return totalPrice;
  }

  /**
   * Adds a product to the cart, upadtes the cart in the user's database
   * 
   * @param {product} - product to add 
   */
  addToCart(product : any){
    const existingItem = this.cartItemList.find((p: { id: any; }) => p.id === product.id);
    if (existingItem){
      existingItem.quantity += 1;
      existingItem.total += existingItem.price;
    }else{
      this.cartItemList.push(product);
    }
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    this.usersService.updateUser(this.cartItemList);
  }

  /**
   * Removes an item from the cart, updates the cart in the user's database
   * 
   * @param {product} - product to remove
   */
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

  /**
   * Removes all items from the cart, updates the cart in the user's database
   */
  removeAllCart(){
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    this.usersService.updateUser(this.cartItemList);
  }
}

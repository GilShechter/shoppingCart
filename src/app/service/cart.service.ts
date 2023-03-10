import { Firestore, doc, collection } from '@angular/fire/firestore';
import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
  public itemsCount : BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private usersService : UsersService, private firestore : Firestore) { }

  /**
   * @returns {Observable<any>} - the products in the cart
   */
  getProducts(){
    return this.productList.asObservable();
  }

  /**
   * @returns {Observable<number>} - the number of items in the cart
   */
  getItemsCount(){
    return this.itemsCount.asObservable();
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
    this.updateItemsCount();
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
    this.updateItemsCount();
  }

  /**
   * Removes all items from the cart, updates the cart in the user's database
   */
  removeAllCart(){
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    this.usersService.updateUser(this.cartItemList);
    this.updateItemsCount();
  }

  /**
   * Updates the quantity of an item in the cart, updates the cart in the user's database
   * 
   * @param {any} item - the item to be updated
   * @param {any} event - the event that triggered the function
   */
  updateQuantity(item: any, event: any){
    item.quantity = event;
    item.total = item.price * item.quantity;
    this.productList.next(this.cartItemList);
    this.updateItemsCount();
  }

  /**
   * Updates the number of items in the cart
   */
  updateItemsCount(){
    var count = 0;
    for (var item of this.cartItemList){
      count += item.quantity;
    }
    this.itemsCount.next(count);
  }
}

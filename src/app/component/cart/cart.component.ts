import { HeaderComponent } from './../header/header.component';
import { AngularFireModule } from '@angular/fire/compat';
import { Component } from '@angular/core';
import { collection, Firestore } from '@angular/fire/firestore';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  public products : any = [];
  public totalPrice : string = "0";

  constructor(private cart : CartService, private firestore : Firestore, private afs : AngularFireModule) { }

  /**
   * Gets the products from the cart, updates the total price
   */
  ngOnInit() {
    this.cart.getProducts()
    .subscribe(res => {
      this.products = res;
      this.totalPrice = this.cart.getTotalPrice().toFixed(2);
    })
  }

  /** 
   * Removes the selected item from the cart
   * 
   * @param {any} item - the item to be removed
   */
  removeItem(item: any) {
    this.cart.removeCartItem(item);
  }

  /**
   * Removes all items from the cart
   */
  removeAll() {
    this.cart.removeAllCart();
  }

  /**
   * Updates the quantity of the selected item
   * 
   * @param {any} item - the item to be updated
   * @param {any} event - the event that triggered the function
   */
  updateQuantity(item: any, event: any) {
    const existingItem = this.products.find((p: { id: any; }) => p.id === item.id);
    if (existingItem){
      existingItem.quantity = event.target.value;
      existingItem.total = existingItem.price * existingItem.quantity;
      this.totalPrice = this.cart.getTotalPrice().toFixed(2);
    }
  }
}

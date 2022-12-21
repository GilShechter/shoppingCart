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

  ngOnInit() {
    this.cart.getProducts()
    .subscribe(res => {
      this.products = res;
      this.totalPrice = this.cart.getTotalPrice().toFixed(2);
    })
  }

  removeItem(item: any) {
    this.cart.removeCartItem(item);
  }

  removeAll() {
    this.cart.removeAllCart();
  }

  updateQuantity(item: any, event: any) {
    this.products.map((a: any) => {
      if(item.id === a.id) {
        a.quantity = event.target.value;
        a.total = a.price * a.quantity;
        this.totalPrice = this.cart.getTotalPrice().toFixed(2);
      }
    })
  }
}

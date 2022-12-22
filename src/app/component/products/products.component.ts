import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  public productList : any ;
  public keyWord : string = '';
  constructor(private api : ApiService, private cartService: CartService) { }

  /**
   * Gets the products from the API, and adds the quantity and total properties to each product
   * Items will be filtered by the search keyWord
   */
  ngOnInit(): void {
    this.api.getProducts().subscribe(res => {
      this.productList = res;
      this.productList.forEach((item:any) => {
        Object.assign(item, {quantity: 1, total: item.price});
      });
    })

    this.cartService.search.subscribe((value: any) => {
      this.keyWord = value;
    })
  }

  /**
   * Adds new item to the cart
   * 
   * @param item - the product to add to the cart
   */
  addToCart(item : any){
    this.cartService.addToCart(item);
  }
}

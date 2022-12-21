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

  addToCart(item : any){
    this.cartService.addToCart(item);
  }
}

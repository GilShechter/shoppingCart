import { UsersService } from './../../service/users.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public itemsCount : number = 0;
  public keyWord : string = '';
  user$ = this.usersService.currentUserProfile$;
  constructor(private cart : CartService, private auth : AuthenticationService, 
              public router : Router, private usersService : UsersService) { }

  /**
   * Gets the products from the cart, updates the items count
   */
  ngOnInit() {
    this.cart.getItemsCount()
    .subscribe(number => {
      this.itemsCount = number;
    })
  }

  /**
   * Search for a product by title, filtered from user's input
   * 
   * @param event - the input inserted by the user
   */
  search(event: any){
    this.keyWord = (event.target as HTMLInputElement).value;
    this.cart.search.next(this.keyWord);
  }

  /**
   * Logs out the user, empty cart and redirect to login page
   */
  logout(){
    this.auth.logout().subscribe(() => {
      this.login();
    })
  }

  /**
   * Redirects to login page
   */
  login(){
    this.router.navigate(['/login']);
  }
}

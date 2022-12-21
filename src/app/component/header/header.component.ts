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
              private router : Router, private usersService : UsersService) { }

  ngOnInit() {
    (this.cart.getProducts())
    .subscribe(res => {
      this.itemsCount = res.length;
    })
  }

  search(event: any){
    this.keyWord = (event.target as HTMLInputElement).value;
    this.cart.search.next(this.keyWord);
  }

  logout(){
    // this.cart.removeAllCart();
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/login']);
    })
  }

  login(){
    this.router.navigate(['/login']);
  }
}

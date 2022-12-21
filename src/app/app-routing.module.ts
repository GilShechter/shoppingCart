import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToProducts = () => redirectLoggedInTo(['products']);

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent, ...canActivate(redirectToLogin) },
  { path: 'cart', component: CartComponent, ...canActivate(redirectToLogin) },
  { path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToProducts) },
  { path: 'signup', component: SignupComponent, ...canActivate(redirectLoggedInToProducts)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

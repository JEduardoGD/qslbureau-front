import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean | UrlTree {
     let url: string = state.url;

         return this.checkLogin(url);
     }

     checkLogin(url: string): true | UrlTree {
        let val: string =  localStorage.getItem('isUserLoggedIn') + "";

        if(val != null && val == "true"){
           if(url == "/login")
              this.router.parseUrl('/expenses');
           else 
              return true;
        }
           return this.router.parseUrl('/login');
     }
}
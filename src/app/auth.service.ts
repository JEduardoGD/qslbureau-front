import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   api = 'http://localhost:8080';
   token!: string;
    
   isUserLoggedIn: boolean = false;
    
   constructor(private http: HttpClient,private router: Router) { }
    
   login(userName: string, password: string): Observable<any> {
     this.http.post(this.api + '/authenticate', {username: userName, password: password})
        .subscribe((resp: any) => {
           this.router.navigate(['profile']);
           localStorage.setItem('auth_token', resp.token);
        })

      return of(this.isUserLoggedIn).pipe(delay(1000), tap(val => { 
         console.log("Is User Authentication is successful: " + val); 
      })
      );
   }

  logout(): void {
  this.isUserLoggedIn = false;
     localStorage.removeItem('isUserLoggedIn'); 
  }
}

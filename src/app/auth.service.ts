import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { delay, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   token!: string;
    
   isUserLoggedIn: boolean = false;
    
   constructor(private http: HttpClient,private router: Router) { }
    
   login(userName: string, password: string): Observable<any> {
     this.http.post(environment.apiUrl + '/authenticate', {username: userName, password: password})
         .subscribe((resp: any) => {
            localStorage.setItem('auth_token', resp.token);
            localStorage.setItem('isUserLoggedIn', 'true');
            this.router.navigate(['qsl-capture']);
        })

         return of(this.isUserLoggedIn).pipe(delay(1000), tap(val => { 
            console.log("Is User Authentication is successful: " + val); 
         }));
   }

  logout(): void {
  this.isUserLoggedIn = false;
     localStorage.removeItem('isUserLoggedIn'); 
  }
}

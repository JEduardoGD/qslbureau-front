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
            localStorage.setItem('auth_token', resp.jwtToken);
            localStorage.setItem('id_capturer', resp.capturerId);
            localStorage.setItem('isUserLoggedIn', `${true}`);
            localStorage.setItem('locals', JSON.stringify(resp.locals));
            this.router.navigate(['qsl-capture']);
        })

         return of(this.isUserLoggedIn).pipe(delay(1000), tap(val => { 
            console.log("Is User Authentication is successful: " + val); 
         }));
   }

  logout(): void {
   this.isUserLoggedIn = false;
   localStorage.removeItem('auth_token');
   localStorage.removeItem('id_capturer');
   localStorage.removeItem('active_local_id');
   localStorage.removeItem('active_local_name');
   localStorage.removeItem('isUserLoggedIn');
   localStorage.removeItem('locals');
   
  }
}

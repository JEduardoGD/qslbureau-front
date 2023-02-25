import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Qslcard } from 'src/entity/Qslcard.entity';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  rootURL = 'http://localhost:8080';
  qslCardUrl = '/qslcard';

  captureQsl(qslcard: Qslcard) {
    let auth_token = localStorage.getItem('auth_token');

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${auth_token}`
      })
    };
		this.http.put<Qslcard>(this.rootURL + this.qslCardUrl, qslcard, httpOptions)
			.subscribe(data => {
				console.log(data);
			});
  }
}

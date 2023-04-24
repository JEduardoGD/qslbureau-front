import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { Qslcard } from 'src/entity/Qslcard.entity';
import { RowObject } from 'src/entity/RowObject.entity';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient, private router: Router) { }
  qslCardUrl = '/qslcard';
  errorMessage: string | undefined;

  captureQsl(qslcard: Qslcard) {
    let auth_token = localStorage.getItem('auth_token');

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${auth_token}`
      })
    };
    this.http.put<Qslcard>(environment.apiUrl + this.qslCardUrl, qslcard, httpOptions)
    .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.errorMessage = error.message;
      console.error('There was an error!', error);
      // after handling error, return a new observable 
      // that doesn't emit any values and completes
      if(error.status == HttpStatusCode.Unauthorized){
        Swal.fire({
          icon: 'error',
          title: `Las credenciales han expirado.`
        }).then(() =>{
          this.router.navigate(['/logout']);
        });
      }
      return of();
  }))
  .subscribe(data => {
    Swal.fire({
      icon: 'success',
      title: `Guardado, slot ${data.slotNumber}!`,
      html: `Qsls en el slot: <b>${data.qslsInSlot}</b>`,
      timer: 3000
    });
  });
  }

  qslsByLocalId(localId: string | null): Observable<RowObject[]>{
    let auth_token = localStorage.getItem('auth_token');

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${auth_token}`
      })
    };
    return this.http.get<RowObject[]>(environment.apiUrl + this.qslCardUrl + "/byslot/" + localId, httpOptions)
    .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.errorMessage = error.message;
      console.error('There was an error!', error);
      // after handling error, return a new observable 
      // that doesn't emit any values and completes
      if(error.status == HttpStatusCode.Unauthorized){
        Swal.fire({
          icon: 'error',
          title: `Las credenciales han expirado.`
        }).then(() =>{
          this.router.navigate(['/logout']);
        });
      }
      return of();
  }))
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Qslcard } from 'src/entity/Qslcard.entity';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
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
      return of();
  }))
  .subscribe(data => {
    Swal.fire({
      icon: 'success',
      title: `Guardado, slot ${data.slotNumber}!`,
      html: `Qsls en el slot: <b>${data.qslsInSlot}</b>`,
      timer: 2000
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  });
  }
}

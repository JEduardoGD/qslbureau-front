import { HttpClient, HttpHeaders, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { Standardresponse } from "src/entity/Standardresponse.entity";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  router: any;

  constructor(private http: HttpClient) { }
  contactUrl = '/contact';
  errorMessage : string | undefined;

  getContactInfo(callsign: string | undefined):Promise<number>{
      let auth_token = localStorage.getItem('auth_token');
      return new Promise((resolve, reject) => {
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: `Bearer ${auth_token}`
          })
        };
        this.http.get(`${environment.apiUrl}${this.contactUrl}/findactiveforcallsign/${callsign}`, httpOptions)
        .pipe(catchError((error: any, caught: Observable<any>): Observable<Standardresponse> => {
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
          resolve(data.objectPayload);
        });
      });
  }

  sendContactEmail(idContact: number | undefined, slotid: string | undefined) {
    let id_capturer = localStorage.getItem('id_capturer');
    let auth_token = localStorage.getItem('auth_token');
    return new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: `Bearer ${auth_token}`
        })
      };
      this.http.get(`${environment.apiUrl}${this.contactUrl}/sendmail/slotid/${slotid}/contactid/${idContact}/representativeid/${id_capturer}`, httpOptions)
      .pipe(catchError((error: any, caught: Observable<any>): Observable<Standardresponse> => {
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
        resolve(data.objectPayload);
      });
    });

  }
}
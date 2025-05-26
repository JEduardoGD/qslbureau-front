import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Standardresponse } from 'src/entity/Standardresponse.entity';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) {}
  emailUrl = '/email';
  errorMessage : string | undefined;
  router: any;

  getListOfEmailSendedForSlot(slotid:string|undefined){
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiUrl}${this.emailUrl}/getemailsendedforslot/${slotid}`)
      .pipe(catchError((error: any, caught: Observable<any>): Observable<Standardresponse> => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
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
        console.log('fffffffffffffffff')
        resolve(data.objectPayload);
      });
    });
  }
}

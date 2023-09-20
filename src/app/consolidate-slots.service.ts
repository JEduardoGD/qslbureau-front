import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { ConsolidableData } from 'src/entity/ConsolidableData.entity';
import { Qslcard } from 'src/entity/Qslcard.entity';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ConsolidateSlotsService {

  consolidableDataList: ConsolidableData[] = [] ;

  constructor(private http: HttpClient, private router: Router) { }
  aplicablerules = '/aplicablerules';
  errorMessage: string | undefined;

  checkAplicableRules():Promise<number>{
    let auth_token = localStorage.getItem('auth_token');
    let activeLocalId = localStorage.getItem('active_local_id');
    return new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: `Bearer ${auth_token}`
        })
      };
      this.http.get<Qslcard>(environment.apiUrl + this.aplicablerules + '/' + activeLocalId, httpOptions)
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
        resolve(JSON.parse(data.jsonPayload));
      })
    });
  }

  applyRules():Promise<number>{
    let auth_token = localStorage.getItem('auth_token');
    let activeLocalId = localStorage.getItem('active_local_id');
    return new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: `Bearer ${auth_token}`
        })
      };
      this.http.get<Qslcard>(environment.apiUrl + this.aplicablerules + '/applyforlocal/' + activeLocalId, httpOptions)
      .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
        Swal.fire({
          icon: 'error',
          title: error
        }).then(() =>{
          reject(error);
        });
        return of(this.errorMessage);
      }))
      .subscribe(data => {
        resolve(JSON.parse(data.jsonPayload));
      })
    });
  }
}

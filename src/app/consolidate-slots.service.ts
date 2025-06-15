import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { AplicableRules } from 'src/entity/AplicableRules.entity';
import { ConsolidableData } from 'src/entity/ConsolidableData.entity';
import { Qslcard } from 'src/entity/Qslcard.entity';
import { ReporteObj } from 'src/entity/reporte/Reporteobj';
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
    let activeLocalId = localStorage.getItem('active_local_id');
    return new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };
      this.http.get<{objectPayload: ConsolidableData[]}>(environment.apiUrl + this.aplicablerules + '/' + activeLocalId, httpOptions)
      .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
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
        resolve(data.objectPayload);
      })
    });
  }

  applyRules(aplicableRules: AplicableRules):Promise<number>{
    let activeLocalId = localStorage.getItem('active_local_id');
    return new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };
      this.http.put<Qslcard>(environment.apiUrl + this.aplicablerules + '/applyrules', aplicableRules, httpOptions)
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
        resolve(data.objectPayload);
      })
    });
  }

  

  reporteRedoreccopmes():Promise<ReporteObj[]>{
    let activeLocalId = localStorage.getItem('active_local_id');
    return new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };
      this.http.get<{objectPayload: ConsolidableData[]}>(environment.apiUrl + this.aplicablerules + '/' + 'reporte-redoreccopmes', httpOptions)
      .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
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
        resolve(data.objectPayload);
      })
    });
  }
}

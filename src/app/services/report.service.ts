import { HttpClient, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { Standardresponse } from "src/entity/Standardresponse.entity";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  router: any;

  reportsUrl = '/reports';
  errorMessage: any;

  constructor(private http: HttpClient) { }
  
    getOrphansCallsReportFilename(){
        return new Promise((resolve, reject) => {
            this.http.get(`${environment.apiUrl}${this.reportsUrl}/orphans-calls-report-filename`)
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
                resolve(data.jsonPayload);
            });
        });
    }
  
    getRepresentativeReportFilename(representativeId: number){
        return new Promise((resolve, reject) => {
            this.http.get(`${environment.apiUrl}${this.reportsUrl}/reporte-redoreccopmes-filename/${representativeId}`)
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
                resolve(data.jsonPayload);
            });
        });
    }
}
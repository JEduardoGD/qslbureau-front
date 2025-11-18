import { HttpClient, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { Buro } from "src/entity/buro/buro.entity";
import { Standardresponse } from "src/entity/Standardresponse.entity";
import { environment } from 'src/environments/environment';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class IntlService {
    constructor(private http: HttpClient) {}
    buroesUrl = '/buroes';
    errorMessage : string | undefined;
    router: any;

///buroes/findByCallsing/{localsign}
    findBuroesOfCallsign(qslto:Buro[]){
        return new Promise((resolve, reject) => {
        this.http.get(`${environment.apiUrl}${this.buroesUrl}/findByCallsing/${qslto}`)
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
            resolve(data.objectPayload);
        });
        });
    }
}
//"/findByCallsing/{localsign}"
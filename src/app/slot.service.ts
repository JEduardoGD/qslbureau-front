import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Standardresponse } from 'src/entity/Standardresponse.entity';
import { Ship } from 'src/entity/ship.entity';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SlotService {
  router: any;

  constructor(private http: HttpClient) { }
  slotUrl = '/slot';
  shippingUrl = '/shipping';
  
  errorMessage : string | undefined;
  
  closeSlot(slotId: string | null):Promise<any>{
    let auth_token = localStorage.getItem('auth_token');
    return new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: `Bearer ${auth_token}`
        })
      };
      this.http.get(`${environment.apiUrl}${this.slotUrl}/close/byid/${slotId}`, httpOptions)
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
        resolve(data.jsonPayload);
      });
    });
  }

  getSlotsByLocalId(localId: string | null):Promise<number>{
    let auth_token = localStorage.getItem('auth_token');
    return new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: `Bearer ${auth_token}`
        })
      };
      this.http.get(`${environment.apiUrl}${this.slotUrl}/bylocalid/${localId}`, httpOptions)
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
        resolve(data.jsonPayload);
      });
    });
  }
  
  getSlotsForSendByLocalId(localId: string | null):Promise<number>{
    let auth_token = localStorage.getItem('auth_token');
    return new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: `Bearer ${auth_token}`
        })
      };
      this.http.get(`${environment.apiUrl}${this.slotUrl}/forSend/bylocalid/${localId}`, httpOptions)
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
        resolve(data.jsonPayload);
      });
    });
  }
  
  getShippingMethodsForSlotid(slotid:string|undefined):Promise<string>{
    if(slotid == undefined){
      return Promise.resolve('[]');
    } else {
      let auth_token = localStorage.getItem('auth_token');
      return new Promise((resolve, reject) => {
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: `Bearer ${auth_token}`
          })
        };
        this.http.get(`${environment.apiUrl}${this.shippingUrl}/forslotid/${slotid}`, httpOptions)
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
          resolve(data.jsonPayload);
        });
      });
    }
  }
  
  getSlotById(slotid:string|undefined):Promise<string>{
    if(slotid == undefined){
      return Promise.resolve('{}');
    } else {
      let auth_token = localStorage.getItem('auth_token');
      return new Promise((resolve, reject) => {
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: `Bearer ${auth_token}`
          })
        };
        this.http.get(`${environment.apiUrl}${this.slotUrl}/byid/${slotid}`, httpOptions)
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
          resolve(data.jsonPayload);
        });
      });
    }
  }
  
  getShippingMethodOfSlotId(slotid:string|undefined):Promise<string>{
    if(slotid == undefined){
      return Promise.resolve('[]');
    } else {
      let auth_token = localStorage.getItem('auth_token');
      return new Promise((resolve, reject) => {
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: `Bearer ${auth_token}`
          })
        };
        this.http.get(`${environment.apiUrl}${this.shippingUrl}/forslotid/${slotid}`, httpOptions)
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
          resolve(data.jsonPayload);
        });
      });
    }
  }
  
  getShipOfSlotId(slotid:string|undefined):Promise<string>{
    if(slotid == undefined){
      return Promise.resolve('{}');
    } else {
      let auth_token = localStorage.getItem('auth_token');
      return new Promise((resolve, reject) => {
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: `Bearer ${auth_token}`
          })
        };
        this.http.get(`${environment.apiUrl}${this.shippingUrl}/ship/byslotid/${slotid}`, httpOptions)
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
          resolve(data.jsonPayload);
        });
      });
    }
  }
  
  getlocalRepresentativesFor(callsign:string|undefined):Promise<string>{
    if(callsign == undefined){
      return Promise.resolve('[]');
    } else {
      let auth_token = localStorage.getItem('auth_token');
      return new Promise((resolve, reject) => {
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: `Bearer ${auth_token}`
          })
        };
        this.http.get(`${environment.apiUrl}${this.shippingUrl}/regionalrepresentatives/forcallsign/${callsign}`, httpOptions)
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
          resolve(data.jsonPayload);
        });
      });
    }
  }

  updateShipping(ship : Ship):Promise<string>{
    console.log('updateShipping...')
    let auth_token = localStorage.getItem('auth_token');
    return new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: `Bearer ${auth_token}`
        })
      };
      this.http.post(`${environment.apiUrl}${this.shippingUrl}`, ship, httpOptions)
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
        resolve(data.jsonPayload);
      });
    });
  }
}

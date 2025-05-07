import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { InputValidation } from 'src/entity/InputValidation.entity';
import { Standardresponse } from 'src/entity/Standardresponse.entity';
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
  localUrl = '/local';
  
  errorMessage : string | undefined;
  
  closeSlot(slotId: string | null):Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiUrl}${this.slotUrl}/close/byid/${slotId}`)
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
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiUrl}${this.slotUrl}/bylocalid/${localId}`)
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
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiUrl}${this.slotUrl}/forSend/bylocalid/${localId}`)
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
      return new Promise((resolve, reject) => {
        this.http.get(`${environment.apiUrl}${this.shippingUrl}/forslotid/${slotid}`)
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
      return new Promise((resolve, reject) => {
        this.http.get(`${environment.apiUrl}${this.slotUrl}/byid/${slotid}`)
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
      return new Promise((resolve, reject) => {
        this.http.get(`${environment.apiUrl}${this.shippingUrl}/ship/byslotid/${slotid}`)
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
      return new Promise((resolve, reject) => {
        this.http.get(`${environment.apiUrl}${this.shippingUrl}/regionalrepresentatives/forcallsign/${callsign}`)
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

  updateShipping(inputValidation : InputValidation):Promise<string>{
    console.log('updateShipping...')
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}${this.shippingUrl}`, inputValidation)
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

  validateInputs(inputValidation : InputValidation):Promise<InputValidation>{
    console.log('validateInputs...')
    return new Promise<InputValidation>((resolve, reject) => {
      this.http.post(`${environment.apiUrl}${this.shippingUrl}/inputvalidation`, inputValidation)
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
  
  moveToInternational(slotId: string | null):Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiUrl}${this.slotUrl}/movetointl/byid/${slotId}`)
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
  
  setAsUnconfirmable(slotId: string | null):Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiUrl}${this.slotUrl}/setasunconfirmable/byid/${slotId}`)
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

  // for localService
  getLocalsForIdCapturer(idCapturer: string | null):Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiUrl}${this.localUrl}/getlocals/${idCapturer}`)
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
        console.log(data)
        resolve(data.jsonPayload);
      });
    });
  }

  migrateSlot(arg0: string, arg1: string):Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}${this.slotUrl}/migrate`, {slotid: arg0, newlocalid: arg1})
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

  // for localService
  getSlotInfo(idSlot: number | undefined):Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiUrl}${this.slotUrl}/detail/${idSlot}`)
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
        resolve(data);
      });
    });
  }
}

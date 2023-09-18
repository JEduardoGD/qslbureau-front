import { Injectable } from '@angular/core';
import { Qslcard } from 'src/entity/Qslcard.entity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsolidateSlotsService {

  constructor() { }
  aplicablerules = '/aplicablerules';

  captureQslProm(qslcard: Qslcard):Promise<number>{
    return new Promise((resolve, reject) => {
      this.http.put<Qslcard>(environment.apiUrl + this.aplicablerules, qslcard, httpOptions)
      .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      }))
      .subscribe(data => {});
      //reject(2);
      //resolve(1);
    });
  }
}

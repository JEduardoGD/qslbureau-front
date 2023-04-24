import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Qslcard } from 'src/entity/Qslcard.entity';
import { AppService } from '../app.service';
import { RowObject } from 'src/entity/RowObject.entity';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-qsl-captura',
  templateUrl: './qsl-captura.component.html',
  styleUrls: ['./qsl-captura.component.css']
})
export class QslCapturaComponent implements OnInit, OnDestroy {
  checkoutForm;
  dtOptions: DataTables.Settings = {};
  displayTable: boolean = false;
  dtTrigger: Subject<any> = new Subject<any>();
  qslsInLocal: RowObject[] = [];


  constructor(fb: FormBuilder, private appService: AppService){
    console.log('--CONSTRUCTOR--');
    this.checkoutForm = fb.group({
      qslto: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    console.log('--ON INIT--');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
   };
    let activeLocalId = localStorage.getItem('active_local_id');
    this.appService.qslsByLocalId(activeLocalId)
    .subscribe((response: any) => {
      this.qslsInLocal = response;
      this.dtTrigger.next(true);
      this.displayTable = true;
    });
  }


  onSubmit() {
    let u : string = this.checkoutForm.controls['qslto'].value as string;
    this.checkoutForm.reset();
    let qslcard = {} as Qslcard;
    qslcard.toCallsign = u;
    this.appService.captureQsl(qslcard);
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
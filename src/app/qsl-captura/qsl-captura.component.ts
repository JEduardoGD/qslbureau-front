import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Qslcard } from 'src/entity/Qslcard.entity';
import { AppService } from '../app.service';
import { RowObject } from 'src/entity/RowObject.entity';

@Component({
  selector: 'app-qsl-captura',
  templateUrl: './qsl-captura.component.html',
  styleUrls: ['./qsl-captura.component.css']
})
export class QslCapturaComponent {  
  checkoutForm;
  qslsInLocal: RowObject[] = [];


  constructor(fb: FormBuilder, private appService: AppService){
    console.log('--CONSTRUCTOR--');

    this.checkoutForm = fb.group({
      qslto: ["", Validators.required]
    });

    this.refreshTable();
  }

  onSubmit() {
    let u : string = this.checkoutForm.controls['qslto'].value as string;
    this.checkoutForm.reset();
    let qslcard = {} as Qslcard;
    qslcard.toCallsign = u;
    this.appService.captureQslProm(qslcard).then(()=>{
      this.refreshTable();
    });
    
  }

  refreshTable(){
    let activeLocalId = localStorage.getItem('active_local_id');
    this.appService.qslsByLocalId(activeLocalId)
    .subscribe((response: any) => {
      this.qslsInLocal = response;
    });
  }
}
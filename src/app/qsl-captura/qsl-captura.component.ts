import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Qslcard } from 'src/entity/Qslcard.entity';
import { AppService } from '../app.service';

@Component({
  selector: 'app-qsl-captura',
  templateUrl: './qsl-captura.component.html',
  styleUrls: ['./qsl-captura.component.css']
})
export class QslCapturaComponent {
  checkoutForm;

  constructor(fb: FormBuilder, private appService: AppService)
  {
      this.checkoutForm = fb.group({
        qslto: ["", Validators.required]
      });
  }


  onSubmit() {
    let u : string = this.checkoutForm.controls['qslto'].value as string;
    this.checkoutForm.reset();
    let qslcard = {} as Qslcard;
    qslcard.toCallsign = u;
    this.appService.captureQsl(qslcard);
  }
}
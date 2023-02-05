import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-qsl-captura',
  templateUrl: './qsl-captura.component.html',
  styleUrls: ['./qsl-captura.component.css']
})
export class QslCapturaComponent {
  checkoutForm;

  constructor(fb: FormBuilder)
  {
      this.checkoutForm = fb.group({
        qslto: ["", Validators.required]
      });
  }


  onSubmit(customerData:any) {
    // Process checkout data here
    this.checkoutForm.reset();

    console.warn('Your order has been submitted' + customerData);
  }
}

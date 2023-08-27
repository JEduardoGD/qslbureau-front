import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Qslcard } from 'src/entity/Qslcard.entity';
import { AppService } from '../app.service';
import { RowObject } from 'src/entity/RowObject.entity';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-qsl-captura',
  templateUrl: './qsl-captura.component.html',
  styleUrls: ['./qsl-captura.component.css']
})
export class QslCapturaComponent {
  checkoutForm;
  qslsInLocal: RowObject[] = [];


  constructor(fb: FormBuilder, private appService: AppService){
    this.checkoutForm = fb.group({
      qslto: ["", Validators.required]
    });

    this.refreshTable();
  }

  onSubmit() {
    let u : string = this.checkoutForm.controls['qslto'].value as string;
    this.validateCallsign(u).then((hayError) => {
      if(!hayError){
        this.checkoutForm.reset();
        let qslcard = {} as Qslcard;
        qslcard.toCallsign = u;
        this.appService.captureQslProm(qslcard).then((data:any) => {
          this.refreshTable();
        }
        ).catch((e) => {
          console.error(e);
        });
      }
    });
  }

  refreshTable(){
    let activeLocalId = localStorage.getItem('active_local_id');
    if(activeLocalId != null){
      console.log(`active local: ${activeLocalId}`);
      this.appService.qslsByLocalId(activeLocalId)
      .subscribe((response: any) => {
        this.qslsInLocal = response;
      });
    }
  }

  confirmDelteQsl(idqsl : number, toCallsign: string) {
    Swal.fire({
      title: 'Esta seguro?',
      text: `Elminar la QSL para ${toCallsign}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.appService.deleteQslById(idqsl)
        .subscribe((response: any) => {
          Swal.fire(
            'Eliminado!',
            'El registro ha sido eliminado.',
            'success'
          )
          this.refreshTable();
        });
      }
    })
  }  

  validateCallsign(callsign: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let errormsg = '';
      let hayError = false;
      
      if('' == callsign){
        hayError = true;
        errormsg = 'La cadena no puese estar vacia';
      }
  
      if(callsign.length < 3){
        hayError = true;
        errormsg = 'El callsign debe tener al menos longitud de 3';
      }

      if(callsign.toUpperCase() !== callsign){
        hayError = true;
        errormsg = 'La cadena solo puede contener caracteres en mayuscula';
      }

      let activeLocalId = localStorage.getItem('active_local_id');
      console.log('xxxxxxxxxxxxxx');
      console.log(activeLocalId);
      if(activeLocalId == null){
        hayError = true;
        errormsg = 'Debe seleccionar el local activo';
      }
  
      if(hayError){
        Swal.fire({
          title: 'Error al capturar',
          text: `${errormsg}`,
          icon: 'error',
        });
      }
  
      resolve(hayError);
    });
  }
}
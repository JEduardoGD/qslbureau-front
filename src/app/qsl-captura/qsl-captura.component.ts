import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Qslcard } from 'src/entity/Qslcard.entity';
import { AppService } from '../app.service';
import { RowObject } from 'src/entity/RowObject.entity';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';
import { Local } from 'src/entity/Local.entity';

@Component({
  selector: 'app-qsl-captura',
  templateUrl: './qsl-captura.component.html',
  styleUrls: ['./qsl-captura.component.css']
})
export class QslCapturaComponent implements OnInit, AfterViewInit{
  @ViewChild('qslto') qsltoInput: any;

  //checkoutForm;
  qslsInLocal: RowObject[] = [];

  locals: Local[] = [];
  localIdSelected : string = '';
  localNameSelected : string = '';

  qslTo: string = '';
  qslVia: string = '';


  constructor(fb: FormBuilder, private appService: AppService){
    this.refreshTable();
  }

  ngAfterViewInit(): void {
    console.log('--------------');
    console.log(this.qsltoInput);
    this.qsltoInput.nativeElement.focus();
  }

  ngOnInit(): void {
    let localsString = localStorage.getItem('locals');
    if(localsString != null){
      this.locals = JSON.parse(localsString);
    }
    if(this.locals.length == 1){
      this.localIdSelected = this.locals[0].id + '';
      localStorage.setItem('active_local_id', this.locals[0].id + '');
    }
  }

  onSubmit() {
    let idCapturer = localStorage.getItem('id_capturer');
    let activeLocalId:number = 0;
    let lai = localStorage.getItem('active_local_id')
    if(lai != null){
      activeLocalId = +lai;
    }
    this.validateCallsign(this.qslTo).then((hayError) => {
      if(!hayError && idCapturer != null){
        let qslcard = {} as Qslcard;
        qslcard.to = this.qslTo;
        qslcard.via = this.qslVia;
        qslcard.localId = +activeLocalId;
        qslcard.idCapturer = +idCapturer;
        this.appService.captureQslProm(qslcard).then((data:any) => {
          this.qslTo = '';
          this.qslVia = '';
          this.refreshTable();
        }
        ).catch((e) => {
          console.error(e);
        });
      }
    });
    this.qsltoInput.nativeElement.focus();
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
    console.log('==>');
    console.log(callsign);
    console.log('==>');
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
      if(activeLocalId == null){
        hayError = true;
        errormsg = 'Debe seleccionar el local activo';
      }
  
      if(hayError){
        Swal.fire({
          title: 'Error al capturar',
          text: `${errormsg}`,
          icon: 'error',
        }).then(()=>{
          let myModal = new bootstrap.Modal('#staticBackdrop', { keyboard: false });
          myModal.show();
        });
      }
  
      resolve(hayError);
    });
  }

  changeLocalSelected() {
    console.log(this.localIdSelected);
    localStorage.setItem('active_local_id', this.localIdSelected);
    let locals = localStorage.getItem('locals');
    if(locals != null && locals != ''){
      let localsObjs: Local[] = JSON.parse(locals);
      let localObj = localsObjs.find(q => q.id == +this.localIdSelected);
      if(localObj != null){
        localStorage.setItem('active_local_name', localObj.name);
        this.localNameSelected = localObj.name;
      }
    }
    this.refreshTable();
  }
}
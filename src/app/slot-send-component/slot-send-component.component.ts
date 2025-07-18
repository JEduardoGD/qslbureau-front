import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SlotService } from '../services/slot.service';
import { ShippingMethod } from 'src/entity/shipping-method.entity';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegionalRepresentative } from 'src/entity/RegionalRepresentative.entity';
import { Slot } from 'src/entity/Slot.entity';
import { InputValidation } from 'src/entity/InputValidation.entity';

@Component({
  selector: 'app-slot-send-component',
  templateUrl: './slot-send-component.component.html',
  styleUrls: ['./slot-send-component.component.css']
})
export class SlotSendComponentComponent implements OnInit {

  slotid: string | undefined;
  slotsForSend: Slot[] = [];
  shippingMethods: ShippingMethod[] = [];
  shippingMethod = new FormControl();
  addressTextArea = new FormControl();
  regionalRepresentativeFC = new FormControl();
  slot : Slot = {
    shipId: undefined,
    slotId: undefined,
    localId: undefined,
    callsignto: undefined,
    slotNumber: undefined,
    country: undefined,
    createdAt: undefined,
    closedAt: undefined,
    statusId: undefined,
    qslsInSlot: undefined,
    confirmCode: undefined,
    lastEmailSentAt: undefined,
    bgColor: undefined,
    listOf: undefined,
    idContact: undefined,
    email: undefined
  };
  trackingCodeFC = new FormControl();
  regionalRepresentatives : RegionalRepresentative[] = [];
  regionalRepresentativeKey: string = '';
  inputValidation: InputValidation = {
    shipId: undefined,
    idSlot: undefined,
    shippingMethodId: undefined,
    address: undefined,
    regionalRepresentativeId: undefined,
    trackingCode: undefined,
    error: undefined,
    valid: undefined
  };
  shipId: number| undefined;

  constructor(
    private slotService: SlotService,
    private route: ActivatedRoute,
    private router: Router){}
  
  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.slotid = params['slotid'];
        this.slotService.getSlotById(params['slotid'])
        .then((response: any) => {
          this.slot = JSON.parse(response)
        })
        .then((response) => {
          this.slotService.getlocalRepresentativesFor(this.slot.callsignto)
          .then((response: any) => {
            this.regionalRepresentatives = JSON.parse(response);
          });
        })
      
        this.slotService.getShippingMethodsForSlotid(params['slotid'])
        .then((response: any) => {
          this.shippingMethods = JSON.parse(response);
        });

        this.slotService.getShipOfSlotId(params['slotid'])
        .then((response: any) => {
          this.inputValidation = JSON.parse(response);
        })
        .then(()=>{
          this.checkEnabledInputs();
        })

        this.refreshTable();
      }
    );
  }

  isSelected(arg:number|undefined){
    return this.inputValidation.shippingMethodId === arg;
  }

  getStatus(intStatus:number|undefined){
    switch(intStatus){
      case 2001: return 'creado';
      case 2002: return 'abierto';
      case 2003: return 'cerrado';
      case 2004: return 'cerrado para envio';
      case 2005: return 'enviado';
      case 2006: return 'confirmado';
      case 2007: return 'moved to intl';
      default: return '';
    }
  }

  refreshTable(){
    let activeLocalId = localStorage.getItem('active_local_id');
    if(activeLocalId != null){
      this.slotService.getSlotsForSendByLocalId(activeLocalId)
      .then((response: any) => {
        this.slotsForSend = JSON.parse(response);
      });
    }
  }

  checkEnabledInputs(){
    console.log('checkEnabledInputs...');
    console.log(this.inputValidation);
    console.log(this.shippingMethods);
    if(this.inputValidation.shippingMethodId != undefined && this.shippingMethods.length > 0){
      this.shippingMethods.filter(sp => sp.id == this.inputValidation.shippingMethodId)[0].requireAddress ? this.addressTextArea.enable() : this.addressTextArea.disable();
      this.shippingMethods.filter(sp => sp.id == this.inputValidation.shippingMethodId)[0].haveTracking ?  this.trackingCodeFC.enable() : this.trackingCodeFC.disable();
      this.shippingMethods.filter(sp => sp.id == this.inputValidation.shippingMethodId)[0].key == 'REGIONAL' ?  this.regionalRepresentativeFC.enable() : this.regionalRepresentativeFC.disable();
    }
  }

  changeShippingMethod() {
    console.log('changeShippingMethod...');
    this.checkEnabledInputs();
  }

  changeRegionalRepresentative() {
    console.log('changeRegionalRepresentative...');
    this.checkEnabledInputs();
  }

  validateInputs():Promise<any>{
    console.log('validateInputs...');
    return new Promise<any>((resolve, reject) => {
      this.slotService.validateInputs({
        shipId: this.inputValidation.shipId,
        idSlot: this.slotid != undefined ? +this.slotid : undefined,
        shippingMethodId: this.shippingMethods.filter(sp => sp.id == this.inputValidation.shippingMethodId)[0].id,
        address: this.addressTextArea.value,
        regionalRepresentativeId: this.inputValidation.regionalRepresentativeId,
        trackingCode: this.trackingCodeFC.value,
        error: undefined,
        valid: undefined
      })
      .then((response: any) => {
        resolve(JSON.parse(response));
      });
    })
  }

  sendSlot(){
    console.log('sendSlot...')
    this.validateInputs()
    .then((validationResult)=>{
      console.log('validationResult')
      console.log(validationResult)
      this.inputValidation = validationResult;
    })
    .then(() => {
      if(this.inputValidation.valid){
        console.log('valid')
        console.log(this.inputValidation.valid)
        this.slotService.updateShipping(this.inputValidation)
        .then((iv) => {
          console.log('result');
          console.log(JSON.parse(iv));
          this.inputValidation = JSON.parse(iv);
        })
      }
    })
    .then(() => {
      if(!this.inputValidation.valid){
        console.log('not valid')
        console.log(this.inputValidation.valid)
        Swal.fire({
          icon: 'error',
          title: 'Error en la validación de campos',
          text: this.inputValidation.error          
        })
      }
      if(this.inputValidation.valid){
        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: 'Se ha actualizado correctamente'          
        })
      }
    })
    .catch(error => {
      console.log('errorerrorerrorerrorerror');
      console.log(error);
    })
  }
  
  openSlotSend(slotId:number|undefined) {
    this.router.navigate(['/slot-send'], { queryParams: { slotid: `${slotId}` }});
  }

  closeForIntl(slotId:number|undefined){
    Swal.fire({
      title: '¿Está seguro?',
      text: "Las qsls del slot se deben colocar en el buro de salida internacional",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, ¡cerrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.slotService.moveToInternational(`${slotId}`)
        .then((response: string) => {
        })
        .then(() => {
          this.refreshTable();
        })
        .then(() => {
          Swal.fire({
            title: 'Cerrado',
            text: 'Se ha movido el slot para envio en buro internacional.',
            icon: 'success'
          })
        })
      }
    });
  }

  setAsUnconfirmable(slotId:number|undefined){
    Swal.fire({
      title: '¿Está seguro?',
      text: "El Slot sera marcado como 'No Confirmable'",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, ¡marcar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.slotService.setAsUnconfirmable(`${slotId}`)
        .then((response: string) => {
        })
        .then(() => {
          this.refreshTable();
        })
        .then(() => {
          Swal.fire({
            title: 'Cerrado',
            text: 'Se ha movido el slot para envio en buro internacional.',
            icon: 'success'
          })
        })
      }
    });
  }
}

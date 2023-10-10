import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlotService } from '../slot.service';
import { ShippingMethod } from 'src/entity/shipping-method.entity';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegionalRepresentative } from 'src/entity/RegionalRepresentative.entity';
import { resolve } from 'path';
import { Slot } from 'src/entity/Slot.entity';
import { InputValidation } from 'src/entity/InputValidation.entity';
import { error } from 'console';

@Component({
  selector: 'app-slot-send-component',
  templateUrl: './slot-send-component.component.html',
  styleUrls: ['./slot-send-component.component.css']
})
export class SlotSendComponentComponent implements OnInit, AfterViewInit{

  slotid: string | undefined;
  slotsForSend: Slot[] = [];
  shippingMethods: ShippingMethod[] = [];
  shippingMethod: ShippingMethod | undefined;
  addressTextArea = new FormControl();
  regionalRepresentative : RegionalRepresentative = {
    id: undefined,
    name: undefined,
    lastname: undefined,
    username: undefined
  };
  shippingMethodKey: string = '';
  slot : Slot = {
    id: undefined,
    localId: undefined,
    callsignto: undefined,
    slotNumber: undefined,
    country: undefined,
    createdAt: undefined,
    closedAt: undefined,
    statusId: undefined,
    qslsInSlot: undefined,
    confirmCode: undefined
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


  constructor(private slotService: SlotService, private route: ActivatedRoute){}
  
  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.slotid = params['slotid'];
        this.slotService.getSlotById(params['slotid'])
        .then((response: any) => {
          this.slot = JSON.parse(response);
        })
        .then((response) => {
          this.slotService.getlocalRepresentativesFor(this.slot.callsignto)
          .then((response: any) => {
            this.regionalRepresentatives = JSON.parse(response);
          });
        })
      
        this.slotService.getShippingMethodOfSlotId(params['slotid'])
        .then((response: any) => {
          this.shippingMethod = JSON.parse(response);
        });
        
      }
    );
  }

  ngAfterViewInit(){
    this.getShippingMethods();
    this.refreshTable();
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

  getShippingMethods(){
    console.log('getShippingMethods...');
    let activeLocalId = localStorage.getItem('active_local_id');
    if(activeLocalId != null){
      this.slotService.getShippingMethodsForSlotid(this.slotid)
      .then((response: any) => {
        this.shippingMethods = JSON.parse(response);
      });
    }
  }

  changeShippingMethod() {
    console.log('changeShippingMethod...');
    ['PERSONAL', 'REGIONAL'].includes(this.shippingMethodKey) ? this.addressTextArea.disable() : this.addressTextArea.enable();
    this.shippingMethod = this.shippingMethods.filter(sp => sp.key == this.shippingMethodKey)[0];
    this.shippingMethods.filter(sp => sp.key == this.shippingMethodKey)[0].haveTracking ? this.trackingCodeFC.enable() : this.trackingCodeFC.disable();
  }

  changeRegionalRepresentative() {
    console.log('changeRegionalRepresentative...');
    this.regionalRepresentative = this.regionalRepresentatives.filter(rr => rr.id == +this.regionalRepresentativeKey)[0];
    this.shippingMethod = this.shippingMethods.filter(sp => sp.key == this.shippingMethodKey)[0];
    this.shippingMethods.filter(sp => sp.key == this.shippingMethodKey)[0].haveTracking ? this.trackingCodeFC.enable() : this.trackingCodeFC.disable();
  }

  validateInputs():Promise<any>{
    console.log('validateInputs...');
    return new Promise<any>((resolve, reject) => {
      this.slotService.validateInputs({
        shipId: this.shipId,
        idSlot: this.slotid != undefined ? +this.slotid : undefined,
        shippingMethodId: this.shippingMethod?.id,
        address: this.addressTextArea.value,
        regionalRepresentativeId: this.regionalRepresentativeKey,
        trackingCode: this.trackingCodeFC.value,
        error: undefined,
        valid: undefined
      })
      .then((response: any) => {
        this.inputValidation = JSON.parse(response);
        resolve(null);
      });
    })
  }

  sendSlot(){
    console.log('sendSlot...')
    this.validateInputs()
    .then(() => {
      console.log('to send update...')
      console.log('a: ' + this.addressTextArea.value);
      if(this.inputValidation.valid){
        this.slotService.updateShipping(this.inputValidation)
        .then((iv) => {
          console.log(iv);
        })
        .then(() => {
          if(this.inputValidation.error)(
            Swal.fire({
              icon: 'error',
              title: 'Error de validación de campos',
              text: this.inputValidation.error
            })
          )
        })
      }

      if(!this.inputValidation.valid){
        Swal.fire({
          icon: 'error',
          title: 'Error en la validación de campos',
          text: this.inputValidation.error          
        })
      }
    })
    .catch(error => {
      console.log('errorerrorerrorerrorerror');
      console.log(error);
    })
  }
}
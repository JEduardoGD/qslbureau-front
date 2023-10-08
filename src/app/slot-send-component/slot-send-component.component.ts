import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlotService } from '../slot.service';
import { ShippingMethod } from 'src/entity/shipping-method.entity';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegionalRepresentative } from 'src/entity/RegionalRepresentative.entity';
import { resolve } from 'path';
import { Slot } from 'src/entity/Slot.entity';

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
  regionalRepresentative = new FormControl();
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

  validateInputs():Promise<boolean>{
    console.log('validateInputs...');
    return new Promise<boolean>((resolve, reject) => {
      if(this.shippingMethod == undefined){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Se requiere el metodo de envio'
        });
        resolve(false);
      }
      if(this.shippingMethod != undefined){
        let smk = this.shippingMethod.key ?? ''
        if(!['PERSONAL', 'REGIONAL'].includes(smk) && this.addressTextArea.value == ''){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Se requiere direccion para el metodo de envio seleccionado'
          });
        }
        resolve(false);
      }
    })
  }

  sendSlot(){
    console.log('sendSlot...')
    this.validateInputs()
    .then((s) => {
      console.log('to send update...')
      console.log('a: ' + this.addressTextArea.value);
      this.slotService.updateShipping({
        id: undefined,
        datetime: undefined,
        slotId: this.slotid != undefined ? +this.slotid : undefined,
        shippingMethodId: this.shippingMethod?.id,
        zoneId: undefined,
        address: this.addressTextArea.value,
        trackingCode: this.trackingCodeFC.value
      })
      .then(r => {
        if(r){
          console.log('rrrrrrrrrrrrrr');
          console.log(r);
        }
      });
    })
  }
}

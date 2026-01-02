import { AfterViewInit, Component } from '@angular/core';
import { SlotService } from '../services/slot.service';
import Swal from 'sweetalert2';
import { Slot } from 'src/entity/Slot.entity';
import { Router } from '@angular/router';
import { Local } from 'src/entity/Local.entity';
import { resolve } from 'path';
import { Standardresponse } from 'src/entity/Standardresponse.entity';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements AfterViewInit{
localSelectedId: number = 0;
activeLocalId: number = 0;

  slotsInLocal: Slot[] = [];
  localsPosibleChange: Local[] = [];
  slotEdited: Slot = {
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
    email: undefined,
    idContact: undefined
  };
  slotIdForMigrate: number = 0;
  loading: boolean | undefined;
  slot: Slot | undefined;
  
  constructor(private slotService: SlotService, private contactService: ContactService, private router: Router){}

  ngAfterViewInit(): void {
    this.refreshTable();
  }

  refreshTable(){
    this.activeLocalId = localStorage.getItem('active_local_id') != null ? Number(localStorage.getItem('active_local_id')) : 0;
    if(this.activeLocalId != null && this.activeLocalId > 0){
      this.slotService.getSlotsByLocalId(this.activeLocalId + "")
      .then((response: any) => {
        this.slotsInLocal = JSON.parse(response);
      });
    } else {
      Swal.fire({
        title: 'Error', 
        text: `Debe seleccionar un local activo`,
        icon: 'error'
      })
    }
  }

  getStatus(intStatus:number|undefined){
    switch(intStatus){
      case 2001: return 'creado';
      case 2002: return 'abierto';
      case 2003: return 'cerrado';
      case 2004: return 'cerrado para envio';
      case 2005: return 'enviado';
      case 2006: return 'confirmado';
      case 2007: return 'movido a internacional';
      case 2008: return 'no confirmable';
      case 2009: return 'juntado';
      default: return '';
    }
  }

  closeForSending(slotId:number|undefined){
    Swal.fire({
      title: '¿Está seguro?',
      text: "El slot será cerrado para envío",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, ¡cerrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.slotService.closeSlot(`${slotId}`)
        .then(() => {
          this.refreshTable();
        })
        .then(() => {
          Swal.fire({
            title: 'Cerrado',
            text: this.slotEdited.confirmCode != undefined ? `Se ha cerrado el slot para envio, Código de confirmación: ${this.slotEdited.confirmCode}` : 'Se ha cerrado el slot para envio',
            icon: 'success'
          })
        })
      }
    });
  }

  migrateSlot(slotId:number|undefined){
    this.slot = undefined;
    this.slotIdForMigrate = slotId == undefined ? 0 : slotId;
    this.slotService.getLocalsForIdCapturer(localStorage.getItem('id_capturer'))
    .then((response: any) => {
      this.localsPosibleChange = JSON.parse(response);
    })
    .then(() => {
      $('#exampleModal').modal('show');
    })
  }
  
  doMigrateSlot() {
    if(`${this.localSelectedId}` == '0'){
      Swal.fire({
        title: 'Error', 
        text: `Debe seleccionar un local`,
        icon: 'error'
      })
    } else {
      Swal.fire({
        title: '¿Está seguro?',
        text: "Va a trasladar el slot a un nuevo local",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, ¡trasladar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.slotService.migrateSlot(`${this.slotIdForMigrate}`, `${this.localSelectedId}`)
          .then((response: Standardresponse) => {
            if(response.error){
              Swal.fire({ 
                title: 'Error',
                text: `No se pudo migrar el slot: ${response.errorMessage}`,
                icon: 'error'
              })
              reject()
            } else {
              this.slot = Object.assign(response.objectPayload, this.slot);
            }
          })
          .then(() => {
            Swal.fire({
              title: 'Hecho',
              text: `Se ha trasladado al slot numero: ${this.slot?.slotNumber}\n(ID: ${this.slot?.slotId})`,
              icon: 'success'
            })
          })
          .then(() => {
            this.refreshTable();
          })
        }
      });
    }
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
        .then(() => {
          Swal.fire({
            title: 'Cerrado',
            text: 'Se ha movido el slot para envio en buro internacional.',
            icon: 'success'
          })
        })
        .then(() => {
          this.refreshTable();
        })
      }
    });
  }

  sendEmail(idContact:number|undefined, slotId:number|undefined) {
    Swal.fire({
      title: '¿Está seguro?',
      text: "Va a enviar el correo de contacto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, ¡enviar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.contactService.sendContactEmail(idContact, slotId)
        .then((result: any) => {
          if(result == null){
            Swal.fire({
              title: 'Error',
              text: 'No se pudo enviar el correo de contacto',
              icon: 'error'
            })
          } else {
            Swal.fire({
              title: 'Hecho',
              text: 'Se ha enviado el correo de contacto',
              icon: 'success'
            })
          }
        })
        .then(() => {
          this.refreshTable();
        })
        .finally(() => {
          this.loading = false;
        })
      }
    });
  }
}
function reject() {
  throw new Error('Function not implemented.');
}


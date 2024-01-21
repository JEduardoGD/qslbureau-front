import { AfterViewInit, Component } from '@angular/core';
import { SlotService } from '../slot.service';
import Swal from 'sweetalert2';
import { Slot } from 'src/entity/Slot.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements AfterViewInit{
sendSlot(arg0: number|undefined) {
throw new Error('Method not implemented.');
}

  slotsInLocal: Slot[] = [];
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
    confirmCode: undefined
  };
  
  constructor(private slotService: SlotService, private router: Router){}

  ngAfterViewInit(): void {
    this.refreshTable();
  }

  refreshTable(){
    let activeLocalId = localStorage.getItem('active_local_id');
    if(activeLocalId != null){
      this.slotService.getSlotsByLocalId(activeLocalId)
      .then((response: any) => {
        this.slotsInLocal = JSON.parse(response);
      });
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
        .then((response: string) => {
        })
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
}

import { Component } from '@angular/core';
import { SlotService } from '../slot.service';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';
import { Slot } from 'src/entity/Slot.entity';
import { Contactinfo } from 'src/entity/Contactinfo.entity';
import { Qslinfo } from 'src/entity/Qslinfo.entity';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-slot-detail',
  templateUrl: './slot-detail.component.html',
  styleUrls: ['./slot-detail.component.css']
})
export class SlotDetailComponent {
  slotid: string | undefined;
  slot: Slot | undefined;
  contactinfo: Contactinfo | undefined;
  qslinfoList: Qslinfo[] | undefined;
total: number = 0;

  constructor(
      private slotService: SlotService,
      private contactService: ContactService,
      private route: ActivatedRoute){}
      
  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.slotid = params['slotid'];
        this.slotService.getSlotById(params['slotid'])
        .then((response: string) => {
          this.slot = JSON.parse(response);
        })
        .then(() => {
          this.contactService.getContactInfo(this.slot?.callsignto)
          .then((response: any) => {
            this.contactinfo = response;
          });
          this.slotService.getSlotInfo(this.slot?.slotId)
          .then((response: any) => {
            this.qslinfoList = response.objectPayload;
            this.total = this.qslinfoList?.reduce((total, qslinfo) => total + qslinfo.c, 0) || 0;
          });
        })
      });
  }

  sendContactEmail() {
    this.contactService.sendContactEmail(this.contactinfo?.idContact, this.slotid)
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
  }
}
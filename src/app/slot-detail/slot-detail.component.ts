import { Component } from '@angular/core';
import { SlotService } from '../services/slot.service';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Slot } from 'src/entity/Slot.entity';
import { Contactinfo } from 'src/entity/Contactinfo.entity';
import { Qslinfo } from 'src/entity/Qslinfo.entity';
import Swal from 'sweetalert2';
import { EmailService } from '../services/email.service';
import { CallsignDatecontact } from 'src/entity/callsignDatecontact.entity';

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
  loading: boolean = false;
  updating: any;
  contactList: CallsignDatecontact[] | undefined;

  constructor(
      private slotService: SlotService,
      private contactService: ContactService,
      private route: ActivatedRoute,
      private emailService: EmailService){}
      
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
          this.emailService.getListOfEmailSendedForSlot(this.slot?.slotId?.toString())
          .then((response: any) => {
            this.contactList = response;
          })
          .then(() => {
            console.log(this.contactList);
          })
        })
      });
  }

  sendContactEmail() {
    this.loading = true;
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
    .finally(() => {
      this.loading = false;
    })
  }
  
  updateEmail() {
    this.updating = true;
    this.contactService.callForUpdateContactEmail(this.slot?.callsignto)
    .then((result: any) => {
      if(result == null){
        Swal.fire({
          title: 'Error',
          text: 'Ocurrio un error inesperado',
          icon: 'error',
        })
      } else {
        switch(result){
          case 1:
            Swal.fire("No se pudo obtener el correo desce QRZ.com", "", "info");
            break
          case 2:  
            Swal.fire({
              title: 'Atencion',
              text: 'El correo en QRZ.com es el mismo que se encuentra capturado\nDesea actualizar el correo?',
              icon: 'question',
              showDenyButton: true,
              confirmButtonText: "Actualizar",
              denyButtonText: `No actualizar`
            }).then((result) => {
              if (result.isConfirmed) {
                this.contactService.updateContactEmail(this.slot?.callsignto)
                .then((result: any) => {
                  if(result != null){
                    Swal.fire("Actualizado!", "", "success").then(()=> { this.ngOnInit(); })
                  }
                })
              } else if (result.isDenied) {
                Swal.fire("No se actualiza el correo", "", "info");
              }
            });
            break;
          case 3: 
            Swal.fire({
              title: 'Atencion',
              text: 'Los datos del contacto se pueden actualizar, desea actualizarlos?',
              icon: 'question',
              showDenyButton: true,
              confirmButtonText: "Actualizar",
              denyButtonText: `No actualizar`
            }).then((result) => {
              if (result.isConfirmed) {
                this.contactService.updateContactEmail(this.slot?.callsignto)
                .then((result: any) => {
                  if(result != null){
                    Swal.fire("Actualizado!", "", "success").then(()=> { this.ngOnInit(); })
                  }
                })
              } else if (result.isDenied) {
                Swal.fire("No se actualiza el correo", "", "info")
              }
            });
            break;
        }
      }
    })
    .finally(() => {
      this.updating = false;
    })
  }
}
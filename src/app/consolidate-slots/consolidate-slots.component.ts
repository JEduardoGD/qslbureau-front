import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ConsolidateSlotsService } from '../consolidate-slots.service';
import { ConsolidableData } from 'src/entity/ConsolidableData.entity';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';
import { Local } from 'src/entity/Local.entity';
import { AplicableRules } from 'src/entity/AplicableRules.entity';

@Component({
  selector: 'app-consolidate-slots',
  templateUrl: './consolidate-slots.component.html',
  styleUrls: ['./consolidate-slots.component.css']
})
export class ConsolidateSlotsComponent implements OnInit, AfterViewInit{
  locals: Local[] = [];
  localIdSelected : string = '';
  localNameSelected : string = '';
  consolidating: boolean = false;
  
  constructor(private consolidateSlotsService: ConsolidateSlotsService){}
  ngAfterViewInit(): void {
    this.updateTable();
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

  consolidableDataList: AplicableRules[] = [];
  updateTable(){
    let activeLocalId = localStorage.getItem('active_local_id');
    if(activeLocalId == null){
      Swal.fire({
        title: 'Error al capturar',
        text: `Debe seleccionar el local activo`,
        icon: 'error',
      }).then(()=>{
        let myModal = new bootstrap.Modal('#staticBackdrop', { keyboard: false });
        myModal.show();
      });
    } else {
      this.consolidateSlotsService.checkAplicableRules().then((data:any) => {
        this.consolidableDataList = data;
      })
      .catch((e) => {
        console.error(e);
      });
    }
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
  }

  applyConsolidation(aplicableRules: AplicableRules) {
    Swal.fire({
      title: 'Consolidacion',
      text: `Va a consolidar las QSLs existentes en el slot numero ${aplicableRules.slotOrigen.slotNumber} - ${aplicableRules.slotOrigen.callsignto} con el slot numero ${aplicableRules.slotDestino.slotNumber} - ${aplicableRules.slotDestino.callsignto}, de acuerdo?`,
      icon: 'question',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Si, consolidar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Consolidando')
        this.consolidating = true;
        this.consolidateSlotsService.applyRules(aplicableRules).then((data:any) => {
          this.consolidating = false;
        })
        .then(() => {
          Swal.fire({
            title: 'Consolidacion',
            text: `Se consolidaron las QSLs existentes en el slot numero ${aplicableRules.slotOrigen.slotNumber} - ${aplicableRules.slotOrigen.callsignto} con el slot numero ${aplicableRules.slotDestino.slotNumber} - ${aplicableRules.slotDestino.callsignto}`,
            icon: 'success',
          });
        })
        .catch((e) => {
          console.log('Error consolidando')
          console.error(e);
        }).finally(() => {
          console.log('Consolidacion finalizada')
          this.consolidating = false;
          this.updateTable();
        });
      }
    });
  }
}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ConsolidateSlotsService } from '../consolidate-slots.service';
import { ConsolidableData } from 'src/entity/ConsolidableData.entity';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';
import { Local } from 'src/entity/Local.entity';

@Component({
  selector: 'app-consolidate-slots',
  templateUrl: './consolidate-slots.component.html',
  styleUrls: ['./consolidate-slots.component.css']
})
export class ConsolidateSlotsComponent implements OnInit, AfterViewInit{
  locals: Local[] = [];
  localIdSelected : string = '';
  localNameSelected : string = '';
  
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

  consolidableDataList: ConsolidableData[] = [];
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

  appySlots(){
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
      Swal.fire({
        title: 'Esta seguro?',
        text: "Va a trasladar todas las QSL segun el resumen mostrado",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, trasladar!'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('result.isConfirmed')
          this.consolidateSlotsService.applyRules().then((data:any) => {
            let resultOfApply : ConsolidableData [] = data;
            Swal.fire({
              title: 'Hecho',
              text: `Se realizaron ${resultOfApply.length} traslados`,
              icon: 'success',
            });
            this.updateTable();
          })
          .catch((e) => {
            console.error(e);
          });
        }
      })
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
}

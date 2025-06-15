import { Component } from '@angular/core';
import { ConsolidateSlotsService } from '../consolidate-slots.service';
import { CellObj } from 'src/entity/reporte/CellObj';
import { RowObj } from 'src/entity/reporte/RowObj';
import { environment } from 'src/environments/environment';
import { ReportService } from '../services/report.service';
import { ReporteObj } from 'src/entity/reporte/Reporteobj';

@Component({
  selector: 'app-agrupadores',
  templateUrl: './agrupadores.component.html',
  styleUrls: ['./agrupadores.component.css']
})

export class AgrupadoresComponent {

  reporteObjs: ReporteObj[] = [];
  rows: RowObj[] = [];

  token: string | null = localStorage.getItem('auth_token');

  constructor(
    private reportService: ReportService,
    private consolidateSlotsService: ConsolidateSlotsService){
    this.consolidateSlotsService.reporteRedoreccopmes().then((data) => {
      //console.log(data);
      this.reporteObjs = data;
    })
    .then(() => {
      for(let reporteObj of this.reporteObjs){
        let cellReporteObj = {} as CellObj;
        cellReporteObj.representativeId = reporteObj.representativeId;
        cellReporteObj.text = reporteObj.name;
        cellReporteObj.rowspan = 0;

        let sumaTotal = 0;

        for(let rloz of reporteObj.rlozList){
          let cellObjRloz = {} as CellObj;
          cellObjRloz.text = rloz.name;
          cellObjRloz.rowspan = 0;

          let countRow = 1;

          for(let rloc of rloz.rlocList){
            cellObjRloz.rowspan++;
            cellReporteObj.rowspan++;

            let rowObj = {} as RowObj;
            if(cellReporteObj.rowspan == 1){
              rowObj.cellReporteObj = cellReporteObj;
            }            
            if(cellObjRloz.rowspan == 1){
              rowObj.cellObjRloz = cellObjRloz;
            }

            let cellObjCallsignTo = {} as CellObj;
            cellObjCallsignTo.text = rloc.callsignTo;
            cellObjCallsignTo.rowspan = 1;
            rowObj.cellCallsignTo = cellObjCallsignTo;
            
            let cellCallsignRedirect = {} as CellObj;
            cellCallsignRedirect.text = rloc.callsignRedirect;
            cellCallsignRedirect.rowspan = 1;
            rowObj.cellCallsignRedirect = cellCallsignRedirect;
            
            let cellLocalId = {} as CellObj;
            cellLocalId.text = rloc.localId?.toString();
            cellLocalId.rowspan = 1;
            rowObj.cellLocalId = cellLocalId;
            
            let cellSlotNum = {} as CellObj;
            cellSlotNum.text = rloc.slotNum?.toString();
            cellSlotNum.rowspan = 1;
            rowObj.cellSlotNum = cellSlotNum;
            
            let cellTotal = {} as CellObj;
            cellTotal.text = rloc.total?.toString();
            cellTotal.rowspan = 1;
            rowObj.cellTotal = cellTotal;

            sumaTotal += rloc.total;

            this.rows.push(rowObj);

            if(countRow++ == rloz.rlocList.length){
              let rowObjTotal = {} as RowObj;

              cellObjRloz.rowspan++;
              cellReporteObj.rowspan++;

              rowObjTotal.cellCallsignTo = {} as CellObj;
              rowObjTotal.cellCallsignRedirect = {} as CellObj;
              rowObjTotal.cellLocalId = {} as CellObj;
              rowObjTotal.cellSlotNum = {} as CellObj;
              
              let cellTotal = {} as CellObj;
              cellTotal.text = sumaTotal.toString();
              cellTotal.rowspan = 1;
              rowObjTotal.cellTotal = cellTotal;

              this.rows.push(rowObjTotal);
            }
          }
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  downloadOrphanCallsigns(){
    let anchor = document.createElement("a");
    document.body.appendChild(anchor);
    let file = environment.apiUrl + "/reports/orphans-calls-report";

    this.reportService.getOrphansCallsReportFilename().then((filename) => {
      fetch(file, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + this.token
        })
      })
          .then(response => response.blob())
          .then(blobby => {
              let objectUrl = window.URL.createObjectURL(blobby);

              anchor.href = objectUrl;
              anchor.download = filename == undefined ? 'orphan-calls-report.xlsx' : filename.toString();
              anchor.click();

              window.URL.revokeObjectURL(objectUrl);
          });
    })
  }

  downloadRepresentativeReport(representativeId: number){
    let anchor = document.createElement("a");
    document.body.appendChild(anchor);
    let file = environment.apiUrl + "/reports/reporte-redoreccopmes/" + representativeId;

    this.reportService.getRepresentativeReportFilename(representativeId).then((filename) => {
      fetch(file, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + this.token
        })
      })
          .then(response => response.blob())
          .then(blobby => {
              let objectUrl = window.URL.createObjectURL(blobby);

              anchor.href = objectUrl;
              anchor.download = filename == undefined ? 'representative-report.xlsx' : filename.toString();
              anchor.click();

              window.URL.revokeObjectURL(objectUrl);
          });
    })
  }
}

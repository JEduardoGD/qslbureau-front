import { Component } from '@angular/core';

@Component({
  selector: 'app-consolidate-slots',
  templateUrl: './consolidate-slots.component.html',
  styleUrls: ['./consolidate-slots.component.css']
})
export class ConsolidateSlotsComponent {
  updateTable(){
    let lsActiveLocalId = localStorage.getItem('active_local_id');
  }
}

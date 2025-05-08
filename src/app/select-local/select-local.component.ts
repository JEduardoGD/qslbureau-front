import { Component, OnInit } from '@angular/core';
import { Local } from 'src/entity/Local.entity';

@Component({
  selector: 'app-select-local',
  templateUrl: './select-local.component.html',
  styleUrls: ['./select-local.component.css']
})
export class SelectLocalComponent implements OnInit {
  navbarCollapsed = true;
  localIdSelected : string = '';
  locals: Local[] = [];
  isUserLoggedIn = localStorage.getItem('isUserLoggedIn') == 'true';

  changeLocalSelected() {
    localStorage.setItem('active_local_id', this.localIdSelected);
    let locals = localStorage.getItem('locals');
    if(locals != null && locals != ''){
      let localsObjs: Local[] = JSON.parse(locals);
      let localObj = localsObjs.find(q => q.id == +this.localIdSelected);
      if(localObj != null){
        localStorage.setItem('active_local_name', localObj.name);
      }
    }
  }

  ngOnInit(): void {
    const t = localStorage.getItem('active_local_id');
    let localsString = localStorage.getItem('locals');
    if(localsString != null && localsString !== ''){
      this.locals = JSON.parse(localsString);
      let localSelected = this.locals.filter(q => (q.id + '') == t)[0];
      if(localSelected != undefined){
          let localSelectedIndex = this.locals.indexOf(localSelected);
          this.localIdSelected = `${localSelectedIndex}: ${localSelected.id}`;
      }
    }
  }

  localLocalsOnInit():Promise<null>{
    return new Promise((resolve, reject) => {
      
    })
  }
}

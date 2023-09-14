import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'qslbureau-front';
  isUserLoggedIn = false;

  constructor(private authService: AuthService) {}
  activeLocalId : number = 0;
  activeLocalName : string = '';

  ngOnInit() {
     let storeData = localStorage.getItem("isUserLoggedIn");
     console.log("StoreData: " + storeData);

     if( storeData != null && storeData == "true")
        this.isUserLoggedIn = true;
     else {
        this.isUserLoggedIn = false;
     }
    
    let activeLocalId = localStorage.getItem('active_local_id');
    if(activeLocalId != null){
      this.activeLocalId = +activeLocalId;
    }

    let activeLocalName = localStorage.getItem('active_local_name');
    if(activeLocalName != null){
      this.activeLocalName = activeLocalName;
    }
  }
}
import { Component } from '@angular/core';
import { IntlService } from '../services/intl.service';
import { Buro, Prefijo } from 'src/entity/buro/buro.entity';

@Component({
  selector: 'app-find-intl',
  templateUrl: './find-intl.component.html',
  styleUrls: ['./find-intl.component.css']
})
export class FindIntlComponent {
  qslTo: any;
  buros: Buro[] = [];
  constructor(private intlService: IntlService){}
  onSubmit() {
    this.findBuroesOfCallsign();
  }

  findBuroesOfCallsign() {
    this.intlService.findBuroesOfCallsign(this.qslTo).then((data:Buro[]|unknown) => {
      if(data instanceof Array){
        this.buros = data as Buro[];
        console.log(this.buros);
      }
    });
  }

  processPrefijos(prefijos:Prefijo[]){
    return prefijos.map(prefijo => `${prefijo.regex}`).join(', ');
  }
}

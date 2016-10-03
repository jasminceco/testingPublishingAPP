import { Component } from '@angular/core';
import { TaskerService } from '../../services/service';

@Component({
    selector: 'about',
    templateUrl: 'wellcome.component.html'
  
})
export class WelcomeComponent {
     constructor(public service :TaskerService,){
         console.log(`hasuser is ${this.service.hasUser}`)

    }
 }
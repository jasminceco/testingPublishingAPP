import { Component } from '@angular/core';
import { AboutComponent }  from '../about/about.component';
import { TaskerService } from '../../services/service';


@Component({
    selector: 'navbar',
    templateUrl: 'navbar.component.html',
  
})
export class NavbarComponent {

    constructor( public service :TaskerService,){
      
  
    }
    onLogOutUser(){
        this.service.logOutUser()
    }

 }
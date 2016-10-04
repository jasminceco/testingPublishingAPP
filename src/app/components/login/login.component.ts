import { Component } from '@angular/core';
import { TaskerService } from '../../services/service';


@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
  
})
export class LogInComponent {
    username;
    password;
      constructor( public service :TaskerService,){
      
  
    }
onLogIn(){
    console.log(this.username)
    console.log(this.password)

    this.service.getTaskerToken(this.username, this.password)
}
 }
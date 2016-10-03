import { Component , OnInit} from '@angular/core';
import { TaskerService } from './services/service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent  {
    constructor(public service :TaskerService,){
        this.service.getTaskerToken('jasminc', 'test123')

    }
     ngOnInit(){
    if (localStorage.getItem('token') !== null){
      if (this.service.curUser){
        console.log('CurrUser exist')
        console.log(this.service.curUser.token)
       this.service.getTasks()

      }else{
        this.service.curUser  = JSON.parse(localStorage.getItem('token'))
        console.log('CurrUser doesnt exit added')
        console.log(this.service.curUser.token)
         this.service.getTasks()

      }
      
    }else{
      alert("there is no token localStorage")
    }
 }
}


import { Component } from '@angular/core';
import { TaskerService } from '../../../services/service';

@Component({
    
    selector: 'edit-task',
    templateUrl: 'edit-task.component.html'
  
})
export class EditTaskComponent { 
    ID: number;
    constructor( public service :TaskerService,){}
    
    onSubmit() {
        console.log(this.ID)
       this.service.editTask(this.ID)
    }
}
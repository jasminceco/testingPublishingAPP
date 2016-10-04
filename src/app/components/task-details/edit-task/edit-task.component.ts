import { Component } from '@angular/core';
import { TaskerService } from '../../../services/service';

@Component({
    
    selector: 'edit-task',
    templateUrl: 'edit-task.component.html'
  
})
export class EditTaskComponent { 
    ID: string;
 task : any;

    constructor( public service :TaskerService,){
      
  
    }
    onSubmit() {

        console.log(this.ID)
       
       if (this.ID === undefined){
             this.task = {
            "id" : this.service.selectedTask.id,
            "TaskName": this.service.selectedTask.TaskName,
            "TaskDesc": this.service.selectedTask.TaskDesc,
            "Status": 0,
            "DueDate": this.service.selectedTask.DueDate,
            "OwnerUserID": this.service.curUser.user.id,
            "AssignedToUserID": this.service.curUser.user.id
            }

       }else{
             this.task = {
            "id" : this.service.selectedTask.id,
            "TaskName": this.service.selectedTask.TaskName,
            "TaskDesc": this.service.selectedTask.TaskDesc,
            "Status": 0,
            "DueDate": this.service.selectedTask.DueDate,
            "OwnerUserID": this.ID[0],
            "AssignedToUserID": this.service.curUser.user.id
            }

       }

        
        
        console.log(this.task)
       this.service.editTask(this.task)
    }
}
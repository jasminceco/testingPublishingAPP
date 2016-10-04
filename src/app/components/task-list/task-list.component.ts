import { Component } from '@angular/core';
import { TaskerService } from '../../services/service';

@Component({
    selector: 'task-list',
    templateUrl: 'task-list.component.html'
  
})
export class TaskListComponent { 
    constructor(public service :TaskerService,){

    }
    onSelectedTask(task: any){
        console.log(task)
        this.service.selectedTask = task
        this.service.getNotesForTask(task.id)

    }
}
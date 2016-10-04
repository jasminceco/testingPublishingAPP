import { Component, OnInit } from '@angular/core';
import { TaskerService } from '../../services/service';
import {ActivatedRoute} from '@angular/router'


@Component({
    selector: 'task-details',
    templateUrl: 'task-details.component.html'
  
})
export class TaskDetailsComponent implements OnInit { 
    taskID: number;
    constructor(public service :TaskerService, private router: ActivatedRoute,){
       

    }
    ngOnInit(){
        if (this.service.selectedTask === undefined){
            this.router.params.subscribe( params => {
            this.taskID = params['id']
            console.log(`task id is ${this.taskID}`)
            })
            this.service.getTask(this.taskID)
            this.service.getNotesForTask(this.taskID)

        } 
    }

    backButtonPresed(){
        this.service.selectedTask = null
        this.service.Mynotes = null
    }
    onTaskDelete(id){
        this.service.deleteTask(id)

    }
}
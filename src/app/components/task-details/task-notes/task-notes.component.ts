import { Component, OnInit } from '@angular/core';
import { TaskerService } from '../../../services/service';
import {ActivatedRoute} from '@angular/router'


@Component({
    selector: 'task-notes',
    templateUrl: 'task-notes.component.html'
  
})
export class TaskNotesComponent implements OnInit { 
    taskID: number;
    constructor(public service :TaskerService, private router: ActivatedRoute,){
    

    }
    ngOnInit(){
   
       
    }
    deleteNote(id){
        this.service.deleteTaskNote(id)
    }
}
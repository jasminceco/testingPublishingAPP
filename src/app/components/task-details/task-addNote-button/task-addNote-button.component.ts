import { Component, OnInit } from '@angular/core';
import { TaskerService } from '../../../services/service';
import {ActivatedRoute} from '@angular/router'


@Component({
    selector: 'task-addNote-button',
    templateUrl: 'task-addNote-button.component.html'
  
})
export class AddNoteButtonComponent implements OnInit { 
    taskID: number;
    noteBody: string;
    constructor(public service :TaskerService, private router: ActivatedRoute,){
       

    }
    ngOnInit(){
   
       
    }

    onAddNote(){
       this.service.addNoteOnTask(this.service.selectedTask.id, this.noteBody)
       this.noteBody = ''
    }
}
import { Component, OnInit } from '@angular/core';
import { TaskerService } from '../../services/service';

@Component({
    selector: 'task-list',
    templateUrl: 'task-list.component.html',
    styleUrls: ['task-list.component.css']
  
})
export class TaskListComponent implements OnInit { 
    constructor(public service :TaskerService,){

    }
    onSelectedTask(task: any){
        console.log(task)
        this.service.selectedTask = task
        this.service.getNotesForTask(task.id)
        this.service.isRead(task.id)

    }
    ngOnInit(){
     
    }
    taskCompleted(id){
        console.log('task completed pressed')
        console.log(id)
        this.service.taskCompleted(id)
    }
    taskReopen(id){
           console.log('task reOpen pressed')
        console.log(id)
        this.service.taskReOpen(id)

    }
    deleteTask(id){
          console.log('task Delete pressed')
        console.log(id)
        this.service.deleteTask(id)

    }
}
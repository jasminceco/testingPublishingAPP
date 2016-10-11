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
    status:string = 'All tasks'

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
    onStatusOpen(){
        this.status = 'Open Tasks'
         this.service.getOpenTasks()

    }
    onStatusClose(){
         this.status = 'Completed Tasks'
   this.service.getClosedTasks()
    }
    onStatusAll(){
        this.status = 'All tasks'
        this.service.getTasks()
    }
    onOVERDUE(){
          this.status = 'Over due tasks'
        this.service.getOverduetasksTasks()
    }
}
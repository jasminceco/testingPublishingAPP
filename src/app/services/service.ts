import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import {CurUser} from './curUser'
import {MyTasks} from './myTasks'
import {MyNotes} from './MyNote'
import {Users} from './Users'
@Injectable()

export class TaskerService{
    // "http://localhost:8100/login/"
taskerURL: string = "https://damp-beach-94332.herokuapp.com/"
public curUser: CurUser;
public myapi: string = "Jasmin"
public Mytasks: MyTasks[] = []
public selectedTask: MyTasks;
public Myusers: Users[] = [];
public Mynotes: MyNotes[];
public hasUser: boolean = false


    constructor(public _http :Http){
        console.log('Service Runing...')
    }

    getTaskerToken(username: string, password: string){
       
        var insParameter = {
          "UserName": username,
          "Password": password
        }
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        

        return this._http.post(`${this.taskerURL}login`, insParameter, {headers:headers})
            .map(res => res.json()).subscribe(user => {
        console.log(user)
        // alert(user.token)
        if (typeof(Storage) !== "undefined"){
        localStorage.setItem('token', JSON.stringify(user))
        this.curUser = user
        this.getTasks()
        
      }else{
        console.log('local storage is not Suported')
      }
      })
    }
    logOutUser(){
       localStorage.removeItem('token')
       this.curUser = null
       this.Mytasks = null
       this.hasUser = false
    }

    getTasks(){
        
        if (JSON.parse(localStorage.getItem('token')) === null){
              console.log('there is no token to load')
        }else{
         var authheader = `Basic ${this.curUser.token}`;
         var headers = new Headers();
             headers.append('Content-Type','application/json');
             headers.append( "Authorization", authheader)
             
       
        return this._http.get(`${this.taskerURL}task`, {headers: headers}).map(res => res.json()).subscribe(tasks => {
             this.Mytasks = tasks.tasks
             this.hasUser = true
       console.log(tasks.tasks)
       }, err => console.log(err), () => console.log('Get tasks'));
        } 
    }
        getOpenTasks(){
        
        if (JSON.parse(localStorage.getItem('token')) === null){
              console.log('there is no token to load')
        }else{
         var authheader = `Basic ${this.curUser.token}`;
         var headers = new Headers();
             headers.append('Content-Type','application/json');
             headers.append( "Authorization", authheader)
             
       
        return this._http.get(`${this.taskerURL}task?status=0`, {headers: headers}).map(res => res.json()).subscribe(tasks => {
             this.Mytasks = tasks.tasks
             this.hasUser = true
       console.log(tasks.tasks)
       }, err => console.log(err), () => console.log('Get tasks'));
        } 
    }
    getClosedTasks(){
        
        if (JSON.parse(localStorage.getItem('token')) === null){
              console.log('there is no token to load')
        }else{
         var authheader = `Basic ${this.curUser.token}`;
         var headers = new Headers();
             headers.append('Content-Type','application/json');
             headers.append( "Authorization", authheader)
             
       
        return this._http.get(`${this.taskerURL}task?status=1`, {headers: headers}).map(res => res.json()).subscribe(tasks => {
             this.Mytasks = tasks.tasks
             this.hasUser = true
       console.log(tasks.tasks)
       }, err => console.log(err), () => console.log('Get tasks'));
        } 
    }
      getOverduetasksTasks(){
        
        if (JSON.parse(localStorage.getItem('token')) === null){
              console.log('there is no token to load')
        }else{
         var authheader = `Basic ${this.curUser.token}`;
         var headers = new Headers();
             headers.append('Content-Type','application/json');
             headers.append( "Authorization", authheader)
             
       
        return this._http.get(`${this.taskerURL}task?overduetasks=1`, {headers: headers}).map(res => res.json()).subscribe(tasks => {
             this.Mytasks = tasks.tasks
             this.hasUser = true
       console.log(tasks.tasks)
       }, err => console.log(err), () => console.log('Get tasks'));
        } 
    }
    

     getTask(id: number){
        
        if (JSON.parse(localStorage.getItem('token')) === null){
              console.log('there is no token to load')
        }else{
         var authheader = `Basic ${this.curUser.token}`;
         var headers = new Headers();
             headers.append('Content-Type','application/json');
             headers.append( "Authorization", authheader)
       
        return this._http.get(`${this.taskerURL}task/${id}`, {headers: headers}).map(res => res.json()).subscribe(task => {
                this.selectedTask = task

                console.log(`Fetched task for task id of ${id} is :` + task)
                console.log(task)
       }, err => console.log(err), () => console.log('Get task'));
        } 
    }
    getNotesForTask(id: number){
        
        if (JSON.parse(localStorage.getItem('token')) === null){
              console.log('there is no token to load')
        }else{
         var authheader = `Basic ${this.curUser.token}`;
         var headers = new Headers();
             headers.append('Content-Type','application/json');
             headers.append( "Authorization", authheader)
       
        return this._http.get(`${this.taskerURL}task/${id}/note`, {headers: headers}).map(res => res.json()).subscribe(note => {
             this.Mynotes = note
       console.log(note)
       }, err => console.log(err), () => console.log('Get Tasks Notes'));
        } 
    }

    deleteTask(id: number){
        if (JSON.parse(localStorage.getItem('token')) === null){
              console.log('there is no token')
        }else{
         var authheader = `Basic ${this.curUser.token}`
         
         var headers = new Headers();
            headers.append('Content-Type','application/json');
            headers.append( "Authorization", authheader)
        return this._http.delete(`${this.taskerURL}task/${id}`, {headers: headers})
                    .map(res => res.json()).subscribe(data => {
                    console.log(data)
                    this.getTasks()
                      }, err => console.log(err), 
                      () => console.log(`Task with task id: ${id} has been deleted!`));
        }
    }

    addTask(task: any, OwnerUserID: number = null ){

         if (JSON.parse(localStorage.getItem('token')) === null){
              console.log('there is no token')
        }else{
          var tempOwnerUserID: any;

            if (OwnerUserID === null){
                tempOwnerUserID = this.curUser.user.id
            } else {
                tempOwnerUserID = OwnerUserID[0]
            }

           var insParameters = {
                "TaskName": task.TaskName,
                "TaskDesc": task.TaskDesc,
                "Status": 0,
                "DueDate": task.DueDate,
                "OwnerUserID": tempOwnerUserID
                }
           
         var authheader = `Basic ${this.curUser.token}`
         var headers = new Headers();
            headers.append('Content-Type','application/json');
            headers.append( "Authorization", authheader)

        return this._http.post(`${this.taskerURL}task`, insParameters, {headers: headers})
                                .map(res => {
                                    res.json();
                                    this.getTasks()
                                }).subscribe(data => {
              console.log(data)
            }, err => console.log(err), () => console.log('Task Added'));
        
        }   
    }

    editTask(OwnerUserID: number = undefined){
         if (JSON.parse(localStorage.getItem('token')) === null){
              console.log('there is no token')
        }else{
         var authheader = `Basic ${this.curUser.token}`
         var headers = new Headers();
            headers.append('Content-Type','application/json');
            headers.append( "Authorization", authheader)
            var tempOwnerUserID: any;

            if (OwnerUserID === undefined){
            tempOwnerUserID = this.curUser.user.id
            } else {
                tempOwnerUserID = OwnerUserID[0]
            }

            var insParameter = {
            "id" : this.selectedTask.id,
            "TaskName": this.selectedTask.TaskName,
            "TaskDesc": this.selectedTask.TaskDesc,
            "Status": 0,
            "DueDate": this.selectedTask.DueDate,
            "OwnerUserID": tempOwnerUserID,
            "AssignedToUserID": this.curUser.user.id
            }
         
            console.log(insParameter)

        return this._http.put(`${this.taskerURL}task/${this.selectedTask.id}`, insParameter, {headers: headers})
                    .map(res => res.json()).subscribe(data => {
                      console.log(data)
                      this.getTasks()
                    }, err => console.log(err), () => console.log('To Do Edited'));        
        }   
    }

    deleteTaskNote(id: number, taskID: number = this.selectedTask.id){
        if (JSON.parse(localStorage.getItem('token')) === null){
              console.log('there is no token')
        }else{
         var authheader = `Basic ${this.curUser.token}`
         
         var headers = new Headers();
            headers.append('Content-Type','application/json');
            headers.append( "Authorization", authheader)
        return this._http.delete(`${this.taskerURL}note/${id}`, {headers: headers})
                    .map(res => res.json()).subscribe(data => {
                    console.log(data)
                    this.getNotesForTask(taskID)
                    this.getTasks()
                      }, err => console.log(err), 
                      () => console.log(`Note with Note id: ${id} has been deleted!`));
        }
    }

    taskCompleted(id: number){
         if (JSON.parse(localStorage.getItem('token')) === null){
              console.log('there is no token')
        }else{
         var authheader = `Basic ${this.curUser.token}`
         var headers = new Headers();
            headers.append('Content-Type','application/json');
            headers.append( "Authorization", authheader)

            console.log(authheader)

        return this._http.put(`${this.taskerURL}task/${id}/complete`,{} ,{headers: headers})
                    .map(res => res.json()).subscribe(data => {
                      console.log(data)
                      this.getTasks()
                    }, err => console.log(err), () => console.log('Task status changed'));        
        }   
    }
     isRead(id: number){
         if (JSON.parse(localStorage.getItem('token')) === null){
              console.log('there is no token')
        }else{
         var authheader = `Basic ${this.curUser.token}`
         var headers = new Headers();
            headers.append('Content-Type','application/json');
            headers.append( "Authorization", authheader)

            console.log(authheader)

        return this._http.put(`${this.taskerURL}task/${id}/markasread`,{} ,{headers: headers})
                    .map(res => res.json()).subscribe(taskUpd => {
                        console.log('updated task')
                      console.log(taskUpd)

                      for (let task of this.Mytasks){
                          if (task.id === id){
                              console.log(task.id)
                              console.log(id)
                              if (taskUpd.IsRead){
                                  task.IsRead = taskUpd.IsRead
                              }
                          }
                      }
                    
                    }, err => console.log(err), () => console.log('Task status changed'));        
        }   
    }

     taskReOpen(id: number){
         if (JSON.parse(localStorage.getItem('token')) === null){
              console.log('there is no token')
        }else{
         var authheader = `Basic ${this.curUser.token}`
         var headers = new Headers();
            headers.append('Content-Type','application/json');
            headers.append( "Authorization", authheader)

            console.log(authheader)

        return this._http.put(`${this.taskerURL}task/${id}/reopen`,{} ,{headers: headers})
                    .map(res => res.json()).subscribe(data => {
                      console.log(data)
                      this.getTasks()
                    }, err => console.log(err), () => console.log('Task status changed'));        
        }   
    }

     addNoteOnTask(taskID: number, NoteBody: any){

         if (JSON.parse(localStorage.getItem('token')) === null){
              console.log('there is no token')
        }else{
         var  insParameters = {
            "TaskID" : taskID,
            "NoteBody": NoteBody,
            "CreatedBy": this.curUser.user.id,

        }
         var authheader = `Basic ${this.curUser.token}`
         var headers = new Headers();
            headers.append('Content-Type','application/json');
            headers.append( "Authorization", authheader)

        return this._http.post(`${this.taskerURL}task/${taskID}/note`, insParameters, {headers: headers})
                                .map(res => {
                                    res.json();
                                    this.getNotesForTask(taskID)
                                    this.getTasks()
                                }).subscribe(data => {
              console.log(data)
            }, err => console.log(err), () => console.log('Task Added'));
        
        }   
    }
     getUsers(){
        
        if (JSON.parse(localStorage.getItem('token')) === null){
              console.log('there is no token to load')
        }else{
         var authheader = `Basic ${this.curUser.token}`;
         var headers = new Headers();
             headers.append('Content-Type','application/json');
             headers.append( "Authorization", authheader)
       
        return this._http.get(`${this.taskerURL}allusers`, {headers: headers}).map(res => res.json()).subscribe(users => {
           
            for (let user of users) {
                if (user.id !== this.curUser.user.id){
                   
                    this.Myusers.push(user)
                }
            }
            
       }, err => console.log(err), () => console.log('Get all Users'));
        } 
    }

    
}

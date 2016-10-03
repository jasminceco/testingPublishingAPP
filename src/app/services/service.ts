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
public Mytasks: MyTasks[];
public selectedTask: MyTasks;
public Myusers: Users[];
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

    addTask(task: any){

         if (JSON.parse(localStorage.getItem('token')) === null){
              console.log('there is no token')
        }else{
           var insParameters: any;
           console.log(task.OwnerUserID)

            if (task.OwnerUserID === undefined){
                insParameters = {
                "TaskName": task.TaskName,
                "TaskDesc": task.TaskDesc,
                "Status": 0,
                "DueDate": task.DueDate,
                "OwnerUserID": this.curUser.user.id,
                }
            
            } else {
                insParameters = {
                "TaskName": task.TaskName,
                "TaskDesc": task.TaskDesc,
                "Status": 0,
                "DueDate": task.DueDate,
                "OwnerUserID": task.OwnerUserID
                }
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

    editTask(id: number,task: any){
         if (JSON.parse(localStorage.getItem('token')) === null){
              console.log('there is no token')
        }else{
         var authheader = `Basic ${this.curUser.token}`
         var headers = new Headers();
            headers.append('Content-Type','application/json');
            headers.append( "Authorization", authheader)

        return this._http.put(`${this.taskerURL}task/${id}`, task, {headers: headers})
                    .map(res => res.json()).subscribe(data => {
                      console.log(data)
                      this.getTasks()
                    }, err => console.log(err), () => console.log('To Do Edited'));        
        }   
    }

    deleteTaskNote(id: number, taskID: number){
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
             this.Myusers = users
             console.log("users are")
             console.log(this.Myusers)
       console.log(users)
       }, err => console.log(err), () => console.log('Get all Users'));
        } 
    }

    
}

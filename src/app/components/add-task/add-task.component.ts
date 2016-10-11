import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';
import { TaskerService } from '../../services/service';
import {Users} from '../../services/Users'

@Component({
    
    selector: 'add-task',
    templateUrl: 'add-task.component.html'
  
})
export class AddTaskComponent { 
      form: FormGroup;
      user: string;
      SearchUser: any[] = []
    
    
    TaskName = new FormControl("", Validators.required);
    ID = new FormControl()

    constructor(public fb: FormBuilder, public service :TaskerService,){
         this.form = fb.group({
            "TaskName": this.TaskName,
            "TaskDesc":["", Validators.required], 
            "DueDate": ['', Validators.required],
             "ID": []
        });

    }
    onSubmit() {
        this.service.addTask(this.form.value, this.form.value.ID)
        this.form.reset();
    }
    onKeyUp(){
        // var newStr = this.user.toLowerCase
        // var newUsersFistName : string;

        //  for ( var i = 0; i < this.service.Myusers.length; i++){
            
        //      if (this.service.Myusers[i].FirstName.search(this.user) == 0 ){
        //          console.log('found user')
        //          console.log(`${this.service.Myusers[i].FirstName} ${this.service.Myusers[i].LastName} ${this.service.Myusers[i].Email}`)
                
        //         this.SearchUser.push(this.service.Myusers[i])
               
          
        //          for ( var i = 0; i < this.SearchUser.length; i++ ){
        //              for (let searchUser of this.SearchUser){
        //                  if (this.SearchUser[i] === searchUser.id){
        //                      this.SearchUser.pop()
        //                  }

        //              }
                    
        //         }
        //           console.log(this.SearchUser)
                
        //      }
        //     //  if (this.service.Myusers[i].FirstName.toLowerCase == newStr ){
        //     //      console.log('found user')
        //     //      console.log(`${this.service.Myusers[i].FirstName} ${this.service.Myusers[i].LastName} ${this.service.Myusers[i].Email}`)
                
        //     //  }
           
        //  }
 
    }
  
    
}
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';
import { TaskerService } from '../../services/service';

@Component({
    
    selector: 'add-task',
    templateUrl: 'add-task.component.html'
  
})
export class AddTaskComponent { 
      form: FormGroup;
    
    
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
}
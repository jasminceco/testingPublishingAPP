import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ReactiveFormsModule} from "@angular/forms";
import { TaskerRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { AboutComponent }      from './components/about/about.component';
import { NavbarComponent }      from './components/navbar/navbar.component';
import { WelcomeComponent }      from './components/wellcome/wellcome.component';
import { AddTaskComponent }      from './components/add-task/add-task.component';
import { TaskListComponent }      from './components/task-list/task-list.component';
import { TaskDetailsComponent }      from './components/task-details/task-details.component';
import { AddNoteButtonComponent }      from './components/task-details/task-addNote-button/task-addNote-button.component';
import { EditTaskComponent }      from './components/task-details/edit-task/edit-task.component';
import { LogInComponent }      from './components/login/login.component';

import { TaskNotesComponent }      from './components/task-details/task-notes/task-notes.component';
import { DatepickerModule } from 'angular2-material-datepicker'
import {TaskerService} from './services/service'



@NgModule({
  declarations: [
    AppComponent, 
    AboutComponent, 
    NavbarComponent, 
    WelcomeComponent, 
    AddTaskComponent, 
    TaskListComponent, 
    TaskDetailsComponent, 
    TaskNotesComponent, 
    AddNoteButtonComponent,
    EditTaskComponent, 
    LogInComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    TaskerRoutingModule,
    ReactiveFormsModule, 
    DatepickerModule
  ],
  providers: [TaskerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

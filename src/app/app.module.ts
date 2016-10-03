import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TaskerRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { AboutComponent }      from './components/about/about.component';
import { NavbarComponent }      from './components/navbar/navbar.component';
import { WelcomeComponent }      from './components/wellcome/wellcome.component';
import { AddTaskComponent }      from './components/add-task/add-task.component';
import { TaskListComponent }      from './components/task-list/task-list.component';
import { TaskDetailsComponent }      from './components/task-details/task-details.component';
import {TaskerService} from './services/service'



@NgModule({
  declarations: [
    AppComponent, 
    AboutComponent, 
    NavbarComponent, 
    WelcomeComponent, 
    AddTaskComponent, 
    TaskListComponent, 
    TaskDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    TaskerRoutingModule
  ],
  providers: [TaskerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

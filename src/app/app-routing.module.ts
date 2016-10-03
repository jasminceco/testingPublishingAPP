import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent }      from './components/about/about.component';
import { WelcomeComponent }      from './components/wellcome/wellcome.component';
import { TaskDetailsComponent }      from './components/task-details/task-details.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'taskDetails/:id',
    component: TaskDetailsComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class TaskerRoutingModule { }

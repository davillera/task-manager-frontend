import { Routes } from '@angular/router';
import {TaskListComponent} from "./task-list/task-list.component";
import {TaskItemDetailComponent} from "./task-list/task-item-detail/task-item-detail.component";

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: TaskListComponent,
    pathMatch: 'full'
  },
  {
    path: 'task/:id',
    component: TaskItemDetailComponent,
  }

]

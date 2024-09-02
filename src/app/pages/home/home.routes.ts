import { Routes } from '@angular/router';
import {TaskListComponent} from "./task-list/task-list.component";

export const HOME_ROUTES: Routes = [{
  path: '',
  component: TaskListComponent,
  pathMatch: 'full'
}]

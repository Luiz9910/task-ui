import { Routes } from '@angular/router';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { TaskListComponent } from './components/tarefas/task-list/task-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tarefas', pathMatch: 'full' },
  { path: 'usuarios', component: UserListComponent},
  { path: 'tarefas', component: TaskListComponent}
];

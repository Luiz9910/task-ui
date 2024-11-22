import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Task } from '../../../models/Tasks';
import { TaskService } from '../../../services/task.service';
import { FormCreateComponent } from '../form-create/form-create.component';
import { FormUpdateComponent } from '../form-update/form-update.component';
import { FormsModule } from '@angular/forms';
import { ButtonConfirmationDeleteComponent } from '../buttonConfirmation/button-confimation-delete/button-confirmation-delete.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [NgFor, RouterOutlet, CommonModule, RouterLinkActive, RouterLink,  FormsModule, TaskListComponent],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  idUser: string = '';
  status: string = '';

  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data: any) => {
      this.tasks = data.body;  // Carrega as tarefas da API
    }, (error) => {
      console.error('Erro ao carregar as tarefas', error);
    });
  }

  // Função para filtrar as tarefas
  filteredTasks() {
    let filteredTasks = this.tasks;

    // Filtro por ID do Usuário
    if (this.idUser) {
      filteredTasks = filteredTasks.filter(task => task.userId.toString().includes(this.idUser));
    }

    // Filtro por Status
    if (this.status) {
      filteredTasks = filteredTasks.filter(task => task.status === this.status);
    }

    return filteredTasks;
  }

  confirmDelete(taskId: number) {
    const dialog = this.dialog.open(ButtonConfirmationDeleteComponent, {
      data: { taskId }
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();
      }
    });
  }

  updateConfirm(task: Task) {
    const dialog = this.dialog.open(FormUpdateComponent, {
      data: task
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();  // Recarrega as tarefas após edição
      }
    });
  }

  createConfirm() {
    const dialog = this.dialog.open(FormCreateComponent, {
      width: '400px'
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();  // Recarrega as tarefas após criação
      }
    });
  }
}

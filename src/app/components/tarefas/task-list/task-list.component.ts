// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/Tasks';
import { CommonModule, NgFor } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ButtonConfirmationDeleteComponent } from '../buttonConfirmation/button-confimation-delete/button-confirmation-delete.component';
import { FormCreateComponent } from '../form-create/form-create.component';
import { FormUpdateComponent } from '../form-update/form-update.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [NgFor, RouterOutlet, CommonModule, RouterLinkActive, RouterLink],
})
export class TaskListComponet implements OnInit {
  title = 'task';
  tasks: Task[] | null = [];

  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (data: HttpResponse<Task[]>) => {
        this.tasks = data.body;
      },
      (error) => {
        console.error('Erro ao carregar as tarefas', error);
      }
    );
  }

  confirmDelete(data: any) {
    const dialog = this.dialog.open(ButtonConfirmationDeleteComponent, {
      data: {
        itemOptionId: data,
      },
    });

    dialog.afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadTasks()
      }
    });
  }

  createConfirm() {
    const dialog = this.dialog.open(FormCreateComponent, {
      width: '400px',
    });

    dialog.afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadTasks()
      }
    });
  }

  updateConfirm(data: any) {
    const dialog = this.dialog.open(FormUpdateComponent, {
      data,
    });

    dialog.afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadTasks()
      }
    });
  }
}

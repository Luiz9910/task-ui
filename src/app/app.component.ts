// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { Task } from './models/Tasks';
import { CommonModule, NgFor } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [NgFor, RouterOutlet, CommonModule, RouterLinkActive, RouterLink]
})
export class AppComponent implements OnInit {
  title = 'task';
  tasks: Task[] | null = [];

  constructor(private taskService: TaskService) {}

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
}

import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '../../../models/User';
import { HttpResponse } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../confirmDelete/confirm-delete/confirm-delete.component';
import { FormUpdateComponent } from '../form-update/form-update.component';
import { FormCreateComponent } from '../form-create/form-create.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, RouterOutlet, CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  title = 'user';
  users: User[] | null = [];

  constructor(private userService: UserService,  public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getTasks().subscribe(
      (data: HttpResponse<User[]>) => {
        this.users = data.body;
      },
      (error) => {
        console.error('Erro ao carregar os usuários', error);
      }
    );
  }

  confirmDelete(data: any) {
    const dialog = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        itemOptionId: data,
      },
    });

    dialog.afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  updateConfirm(data: any) {
    const dialog = this.dialog.open(FormUpdateComponent, {
      data,
    });

    dialog.afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  createConfirm() {
    const dialog = this.dialog.open(FormCreateComponent, {
      width: '400px',
    });

    dialog.afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadUsers();
      }
    });
  }

}

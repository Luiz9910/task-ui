import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-delete',
  standalone: true,
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.css',
  imports: [CommonModule, MatDialogModule],
})
export class ConfirmDeleteComponent {
  constructor(
    private api: UserService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      itemOptionId: number;
    },
    private dialogRef: MatDialogRef<ConfirmDeleteComponent>
  ) {}

  deleteItem(id: any): any {
    return this.api.deleteUser(id).subscribe((response: any) => {
      if (response.status === 200) {
        alert(response.body);
        this.dialogRef.close(true);
      }

      alert(`Erro ao deletar o usuário de id ${id}`);
    });
  }
}

import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TaskService } from '../../../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-confirmation-delete',
  templateUrl: './button-confirmation-delete.component.html',
  styleUrls: ['./button-confirmation-delete.component.css'],
  standalone: true,
  imports: [CommonModule, MatDialogModule],
})
export class ButtonConfirmationDeleteComponent {
  constructor(
    private api: TaskService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      itemOptionId: number;
    },
    private dialogRef: MatDialogRef<ButtonConfirmationDeleteComponent>
  ) {}

  deleteItem(id: any): any {
    return this.api.deleteTask(id).subscribe((response: any) => {
      if (response.status === 200) {
        alert('Tarefa deletado com sucesso!');
        this.dialogRef.close(true);
      } else {
        alert(`Erro ao deletar o tarefa de id ${id}`);
      }
    });
  }
}

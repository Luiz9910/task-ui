import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaskService } from '../../../services/task.service';


export interface TaskData {
  id: number;
  title: string;
  description: string;
  status: string;
  limitDate: string;
}

@Component({
  selector: 'app-form-update',
  templateUrl: './form-update.component.html',
  styleUrls: ['./form-update.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
  ],
})
export class FormUpdateComponent {
  editFormItemOption: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: TaskData,
    private dialogRef: MatDialogRef<FormUpdateComponent>
  ) {
    this.editFormItemOption = this.fb.group({
      id: [this.data.id, Validators.required],
      title: [this.data.title, Validators.required],
      description: [this.data.description, Validators.required],
      status: [this.data.status, Validators.required],
      limitDate: [this.data.limitDate, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.editFormItemOption.valid) {
      const formData = this.editFormItemOption.value;

      this.taskService.updateTask(formData).subscribe(
        (response: any) => {
          if (response.status === 200) {
            alert("Tarefa atualizada com sucesso!");
            this.dialogRef.close(true);
          } else {
            alert("Erro ao atualizar a tarefa");
          }
        },
        (error) => {
          console.error('Error:', error);
          alert('Erro ao atualizar a tarefa');
        }
      );
    }
  }
}

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
  title: string;
  description: string;
  status: string;
  limitDate: string;
  userId: number;
}

@Component({
  selector: 'app-form-create',
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
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css'],
})
export class FormCreateComponent {
  editFormItemOption: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<FormCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskData
  ) {
    this.editFormItemOption = this.fb.group({
      title: [this.data?.title || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      status: [this.data?.status || 'P', Validators.required],
      limitDate: [this.data?.limitDate || '', Validators.required],
      userId: [this.data?.userId || '', Validators.required],
    });
  }
  onSubmit(): void {
    if (this.editFormItemOption.valid) {
      const formData = this.editFormItemOption.value;

      this.taskService.createTask(formData).subscribe(
        (response: any) => {
          try {
            if (response.status === 201) {
              alert("Tarefa criada com sucesso!");
              this.dialogRef.close(true);
            } else {
              alert(`Erro ao criar a tarefa`);
            }
          } catch (error) {
            alert('Erro ao processar a resposta do servidor');
          }
        },
      );
    }
  }

}

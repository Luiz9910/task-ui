import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../../services/user.service';

export interface CreateUserData {
  name: string;
  email: string;
}

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css'],
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
export class FormCreateComponent {
  createUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: UserService,
    private dialogRef: MatDialogRef<FormCreateComponent>
  ) {
    this.createUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.createUserForm.valid) {
      const newUserData: CreateUserData = this.createUserForm.value;

      this.api.createUser(newUserData).subscribe(
        (response: any) => {
          if (response.status === 201) {
            alert('Usuário criado com sucesso!');
            this.dialogRef.close(true);
          } else {
            alert('Erro ao criar o usuário.');
          }
        },
        (error) => {
          console.error('Erro na requisição:', error);
          alert('Erro ao criar o usuário.');
        }
      );
    }
  }
}

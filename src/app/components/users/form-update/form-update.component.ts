import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../../services/user.service';

export interface UserData {
  id: number;
  name: string;
  email: string;
  createdDate: string;
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
    private api: UserService,
    @Inject(MAT_DIALOG_DATA) public data: UserData,
    private dialogRef: MatDialogRef<FormUpdateComponent>,
  ) {
    this.editFormItemOption = this.fb.group({
      id: [this.data.id, Validators.required],
      name: [this.data.name, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.editFormItemOption.valid) {
      const simplifiedData = this.editFormItemOption.value;

      this.api.updateUser(simplifiedData).subscribe(
        (response: any) => {
          if(response.status === 200) {
            alert("Usuário atualizado com sucesso!")
            this.dialogRef.close(true);
          } else {
            alert(`Erro ao atualizar o usuário de id ${simplifiedData.name}`)
          }
        }
      );
    }
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../data/services/user-service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent {
  frmFormulario: FormGroup;
  typesId: Array<String>;
  constructor(private readonly userService: UserServiceService) {
    this.typesId = ['CC', 'TI', 'Pasaporte'];
    this.frmFormulario = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      birthDate: new FormControl(null, [Validators.required]),
      identificationNumber: new FormControl(null, [Validators.required]),
      idtype: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern(
          new RegExp(
            "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
          )
        ),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{8,}$'
        ),
      ]),
    });
  }

  sendData() {
    this.userService.registerUser(this.frmFormulario.value).subscribe({
      next: (data) => {
        console.log(data);
        Swal.fire({
          title: 'Usuario Creado',
          text:
            'Se ha creado el usuario ' + this.frmFormulario.get('name')?.value,
          icon: 'success',
        });
      },
      error: (error) =>
        Swal.fire({
          title: 'Ha ocurrido un error',
          text: error.error,
          icon: 'error',
        }),
      complete: () => console.log('Complete'),
    });
    console.log(this.frmFormulario.value);
  }
}

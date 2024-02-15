import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../data/services/user-service/user-service.service';
import Swal from 'sweetalert2';
import { EncriptService } from '../../data/services/encript-service/encript.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  frmFormulario: FormGroup;
  constructor(
    private readonly userServiceService: UserServiceService,
    private readonly encriptService: EncriptService
  ) {
    this.frmFormulario = new FormGroup({
      identificationNumber: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{8,}$'
        ),
      ]),
    });
  }

  sendData() {
    this.userServiceService.encriptTest(this.frmFormulario.value).subscribe({
      next: (data) => console.log(data),
    });
    this.userServiceService.loginUser(this.frmFormulario.value).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Bienvenido',
          text: 'Has iniciado sesion',
          icon: 'success',
        });
        console.log(data);
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: err.error,
          icon: 'error',
        });
      },
      complete: () => console.log('Complete'),
    });
  }
}

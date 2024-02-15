import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../data/services/user-service/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  frmFormulario: FormGroup;
  imageUrl: string = './assets/imagen.png';
  constructor(
    private readonly userServiceService: UserServiceService,
    private readonly router: Router
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
    this.userServiceService.loginUser(this.frmFormulario.value);
  }
}

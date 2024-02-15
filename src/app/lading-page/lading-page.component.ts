import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EncriptService } from '../../data/services/encript-service/encript.service';

@Component({
  selector: 'app-lading-page',
  templateUrl: './lading-page.component.html',
  styleUrls: ['./lading-page.component.scss'],
})
export class LadingPageComponent implements OnInit {
  typesId: Array<String>;
  frmFormulario: FormGroup;

  constructor(private encriptService: EncriptService) {
    this.typesId = ['CC', 'TI', 'Pasaporte'];
    this.frmFormulario = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      birthDate: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
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
      age: new FormControl(null),
    });
  }
  ngOnInit(): void {
    let payload = this.encriptService.decodeToken(
      localStorage.getItem('token')
    )?.jsonPayload;
    this.frmFormulario.setValue({
      name: payload.name,
      lastName: payload.lastName,
      phone: payload.phone,
      birthDate: new Date(payload.birthDate).toLocaleDateString('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      identificationNumber: payload.identificationNumber,
      idtype: payload.idtype,
      email: payload.email,
      age: payload.age,
    });
  }
}

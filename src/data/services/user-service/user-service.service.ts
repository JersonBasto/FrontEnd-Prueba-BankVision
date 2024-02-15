import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginUser } from '../../../domain/commands/login.command';
import { IResLogin } from 'src/domain/commands/IResLogin.command';
import { EncriptService } from '../encript-service/encript.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private Url = 'http://localhost:9090/';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  registerUser(data: any) {
    this.http.post(`${this.Url}user`, data).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Usuario Creado',
          text: 'Se ha creado el usuario ',
          icon: 'success',
        }).then((res)=>{
          if(res.isConfirmed){
            this.router.navigate(["/login"])
          }
        })
      },
      error: (error) =>
        Swal.fire({
          title: 'Ha ocurrido un error',
          text: error.error,
          icon: 'error',
        }),
      complete: () => console.log('Complete'),
    });
  }
  loginUser(data: ILoginUser) {
    this.http.post<IResLogin>(`${this.Url}user/login`, data).subscribe({
      next: (data) => {
        localStorage.setItem('token', data.jwt);
        Swal.fire({
          title: 'Bienvenido',
          text: 'Has iniciado Sesion',
          icon: 'success',
        }).then((res) => {
          if (res.isConfirmed) {
            this.router.navigate(['/ladingPage']);
          }
        });
      },
      error: (err) =>
        Swal.fire({
          title: 'Error',
          text: err.error,
          icon: 'error',
        }),
      complete: () => console.log('Complete'),
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginUser } from '../../../domain/commands/login.command';
import { IResLogin } from 'src/domain/commands/IResLogin.command';
import { EncriptService } from '../encript-service/encript.service';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private Url = 'http://localhost:9090/';

  constructor(
    private readonly http: HttpClient,
    private readonly encriptService: EncriptService
  ) {}

  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.Url}user`, data, {
      responseType: 'text',
    });
  }
  loginUser(data: ILoginUser): Observable<String> {
    return this.http.post<String>(`${this.Url}user/login`, data);
  }

  encriptTest(data: ILoginUser): Observable<String> {
    let dataJWT = this.encriptService.generateToken(data);
    console.log(dataJWT);
    return this.http.post<String>(`${this.Url}encript`, dataJWT);
  }
}

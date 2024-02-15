import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class EncriptService {
  secret: string =
    '2ES2nH4J/hJf18sSLTh/X2JvXtOUo7NYX4irfCOTK+MWAz0S7xOzSF/KbhZRxE17e208EQaxAsXQkmG2YgxNmQ==';
  constructor(private jwtHelper:JwtHelperService) {}

  generateToken(data: any): string {
    const options: jwtHelper.SignOptions = {
      expiresIn: '1h',
    };
    const token = jwt.sign(data, this.secret, options);
    return token;
  }
}

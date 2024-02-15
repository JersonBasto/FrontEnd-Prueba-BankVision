import { Injectable } from '@angular/core';
import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root',
})
export class EncriptService {
  secret: string =
    '2ES2nH4J/hJf18sSLTh/X2JvXtOUo7NYX4irfCOTK+MWAz0S7xOzSF/KbhZRxE17e208EQaxAsXQkmG2YgxNmQ==';
  constructor() {}

  generateToken(data: any): string {
    const options: jwt.SignOptions = {
      expiresIn: '1h',
    };
    const token = jwt.sign(data, this.secret, options);
    return token;
  }
}

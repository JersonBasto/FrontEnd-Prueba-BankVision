import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class EncriptService {
  secret: string =
    '2ES2nH4J/hJf18sSLTh/X2JvXtOUo7NYX4irfCOTK+MWAz0S7xOzSF/KbhZRxE17e208EQaxAsXQkmG2YgxNmQ==';
  constructor(private jwtHelperService: JwtHelperService) {}

  decodeToken(token: any) {
    let deToken = this.jwtHelperService.decodeToken(token);
    return deToken;
  }
}

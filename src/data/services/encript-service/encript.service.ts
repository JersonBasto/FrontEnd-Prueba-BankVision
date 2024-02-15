import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncriptService {
  secret: string =
    '2ES2nH4J/hJf18sSLTh/X2JvXtOUo7NYX4irfCOTK+MWAz0S7xOzSF/KbhZRxE17e208EQaxAsXQkmG2YgxNmQ==';
  constructor() {}

  base64url(source: any) {
    let encodedSource = CryptoJS.enc.Base64.stringify(source);
    encodedSource = encodedSource.replace(/=+$/, '');
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');
    return encodedSource;
  }

  encodeToken(payload: any) {
    var header = {
      alg: 'HS512', // Cambiado a HS512 para coincidir con Spring Boot
      typ: 'JWT',
    };

    var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    var encodedHeader = this.base64url(stringifiedHeader);

    var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(payload));
    var encodedData = this.base64url(stringifiedData);

    var token = encodedHeader + '.' + encodedData;
    return token;
  }

  signToken(payload: any) {
    var signature: any = CryptoJS.HmacSHA512(payload, this.secret); // Cambiado a HmacSHA512
    signature = this.base64url(signature);

    var signedToken = payload + '.' + signature;
    return signedToken;
  }

  generateToken(data: any) {
    const token = this.encodeToken(data);
    const signedToken = this.signToken(token);
    console.log(signedToken);
  }
}

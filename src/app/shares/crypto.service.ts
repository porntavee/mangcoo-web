import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  plainText: string;
  encryptText: string;
  encPassword: string = '1234432112344321';
  decPassword: string = '1234432112344321';
  conversionEncryptOutput: string;
  conversionDecryptOutput: string;

  constructor() { }

  //method is used to encrypt and decrypt the text  
  convertText(conversion: string) {
    if (conversion == "encrypt") {

      // var salt = CryptoJS.lib.WordArray.random(128 / 8);
      // var key = CryptoJS.PBKDF2("1234432112344321", salt, {
      //   256: 256 / 32,
      //   100: 100
      // });
      // var iv = CryptoJS.lib.WordArray.random(128 / 8);
      var encrypted = CryptoJS.AES.encrypt('123', '1234432112344321', {
        // instead of message try some string or  “9876543210”
        // iv: iv,
        // padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
      });
      // var encrypted_mob = salt.toString() + iv.toString() +
      //   encrypted.toString();
      var encrypted_mob = encrypted.toString();
        
      console.log("encrypted : ", encrypted_mob);
      return encrypted_mob;

      // this.conversionEncryptOutput = CryptoJS.AES.encrypt(this.plainText.trim(), this.encPassword.trim());
    }
    else {
      this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.encryptText.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);
    }
  }
}

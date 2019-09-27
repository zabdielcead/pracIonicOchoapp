import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/interfaces';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // https://ionicframework.com/docs/building/storage
  // ionic cordova plugin add cordova-sqlite-storage
  // npm install --save @ionic/storage

  token: string = null;

  constructor( private http: HttpClient,
               private storage: Storage ) { }

  login(email: string, password: string) {
    const data = {email, password};

    return new Promise ( resolve => {

      this.http.post(`${URL}/user/login`, data)
                .subscribe( resp => {
                  console.log(resp);
                  // tslint:disable-next-line:no-string-literal
                  if (resp['ok'] ) {
                    // tslint:disable-next-line:no-string-literal
                    this.guardarToken( resp['token'] );
                    resolve(true);
                  } else {
                    this.token = null;
                    this.storage.clear();
                    resolve(false);
                  }
                });
    });

  }

  async guardarToken( token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }

  registro( usuario: Usuario ) {
    return new Promise( resolve => {
        this.http.post(`${ URL }/user/create`, usuario)
          .subscribe( resp => {
              console.log(resp);
              // tslint:disable-next-line:no-string-literal
              if (resp['ok']) {
                // tslint:disable-next-line:no-string-literal
                this.guardarToken( resp['token'] );
                resolve(true);
              } else {
                this.token = null;
                this.storage.clear();
                resolve(false);
              }
          });
    });
  }


  validaToken() {
    return new Promise( resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });
      this.http.get(`${ URL  }/user`, { headers })
          .subscribe( resp => {
            // tslint:disable-next-line:no-string-literal
            if (resp['ok']) {
            }
          });
  });
}

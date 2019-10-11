import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // https://ionicframework.com/docs/building/storage
  // ionic cordova plugin add cordova-sqlite-storage
  // npm install --save @ionic/storage

  token: string = null;
  private usuario: Usuario = {};

  constructor( private http: HttpClient,
               private storage: Storage,
               private navCtrl: NavController
               ) { }

  login(email: string, password: string) {
    const data = {email, password};

    return new Promise ( resolve => {

      this.http.post(`${URL}/user/login`, data)
                .subscribe( async resp => {
                  console.log(resp);
                  // tslint:disable-next-line:no-string-literal
                  if (resp['ok'] ) {
                    // tslint:disable-next-line:no-string-literal
                    await this.guardarToken( resp['token'] );
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

    await this.validaToken();
  }

  getUsuario() {
    if ( !this.usuario._id) {
      this.validaToken();
    }
    return { ...this.usuario};
  }

  logout() {
    this.token = null;
    this.usuario = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', {animated: true});
  }

  registro( usuario: Usuario ) {
    return new Promise( resolve => {
        this.http.post(`${ URL }/user/create`, usuario)
          .subscribe( async resp => {
              console.log(resp);
              // tslint:disable-next-line:no-string-literal
              if (resp['ok']) {
                // tslint:disable-next-line:no-string-literal
                await this.guardarToken( resp['token'] );
                resolve(true);
              } else {
                this.token = null;
                this.storage.clear();
                resolve(false);
              }
          });
    });
  }

  // cargar token del storage
  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }


  async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>( resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });
      this.http.get(`${ URL  }/user`, { headers })
          .subscribe( resp => {
            // tslint:disable-next-line:no-string-literal
            if (resp['ok']) {
              // tslint:disable-next-line:no-string-literal
              this.usuario = resp['usuario'];
              resolve(true);
            } else {
              this.navCtrl.navigateRoot('/login');
              resolve(false);
            }
          });
  });
  }

  actualizarUsuario(usuario: Usuario) {
      const headers = new HttpHeaders({
        'x-token': this.token
      });
      return new Promise (resolve => {

        this.http.post(`${ URL }/user/update`, usuario, {headers})
                  .subscribe( resp => {
                    console.log('actualizar usuario', resp);
                    // tslint:disable-next-line:no-string-literal
                    if ( resp['ok'])  {
                        // tslint:disable-next-line:no-string-literal
                        this.guardarToken( resp['token'] );
                        resolve(true);
                    } else {
                         resolve(false);
                    }
                  });
      });
  }

}

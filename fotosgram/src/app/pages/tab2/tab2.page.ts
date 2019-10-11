import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

import { Geolocation } from '@ionic-native/geolocation/ngx'; // geolocalizacion
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'; // camera


declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  // geolocalizacion
  // instalar dos comandos ionic cordova plugin add cordova-plugin-geolocation    y   npm install @ionic-native/geolocation
  // para geolocalizacion en IOS https://github.com/apache/cordova-plugin-geolocation
  // SE AGREGARA EN config.xml
  /*
  <edit-config target="NSLocationWhenInUseUsageDescription" file="*-Info.plist" mode="merge">
    <string>need location access to find things nearby</string>
</edit-config>

  para usar la CAMARA Instalamos el plugin
  ionic cordova plugin add cordova-plugin-camera
  npm install @ionic-native/camera
  SE AGREGARA EN config.xml
  <edit-config file="*-Info.plist" mode="merge" target="NSLocationWhenInUseUsageDescription">
     <string>We use your location for full functionality of certain app features.</string>
  </edit-config>



  instalar elplugin file transfer para subir las fotos a mongo
  ionic cordova plugin add cordova-plugin-file-transfer
  npm install @ionic-native/file-transfer
  https://ionicframework.com/docs/native/file-transfer
  ionic cordova plugin add cordova-plugin-file-transfer
  npm install @ionic-native/file-transfer

  */
  tempImages: string [] = [];

  cargandoGeo = false;

  post = {
    mensaje: '',
    coords: null,
    posicion: false
   };

  constructor(private postsService: PostsService, private route: Router, private geolocation: Geolocation, private camera: Camera) {}


  async crearPost() {
    console.log(this.post);
    const creado = await this.postsService.crearPost( this.post);
    this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    };
    this.tempImages = [];
    this.route.navigateByUrl('/main/tabs/tab1');
  }

  getGeo() {
    if (!this.post.posicion) {
      this.post.coords = null;
      return;
    }
    this.cargandoGeo = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.cargandoGeo = false;

      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      console.log(coords);
      this.post.coords = coords;

     }).catch((error) => {
       console.log('Error getting location', error);
       this.cargandoGeo = false;
     });
    console.log(this.post);
  }

  camara() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.procesarImagen(options);

  }

  libreria() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.procesarImagen(options);
  }

  procesarImagen(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      const img = window.Ionic.WebView.convertFileSrc( imageData );
      console.log(img);
      this.postsService.subirImagen(imageData );
      this.tempImages.push(img);
     }, (err) => {
      // Handle error
     });
  }
}

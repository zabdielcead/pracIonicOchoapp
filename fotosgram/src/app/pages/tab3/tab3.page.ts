import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

   usuario: Usuario = {};

  constructor(private usuarioService: UsuarioService,
              private uiService: UiServiceService,
              private postService: PostsService) {}

  logout() {
    this.postService.paginaPosts = 0;
    this.usuarioService.logout();
  }
  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
    console.log(this.usuario);
  }

  async actualizar(fActualizar: NgForm) {
      if ( fActualizar.invalid ) {
            return;
      }
      const actualizado =  await  this.usuarioService.actualizarUsuario( this.usuario);
      console.log(actualizado);
      if (actualizado) {
        // toast con el mensaje de actualización
        this.uiService.presentToast(  'Registro Actualizado' );
      } else {
        // toast con el error
        this.uiService.presentToast( 'Registro no se pudo actualizar' );
      }
  }

}

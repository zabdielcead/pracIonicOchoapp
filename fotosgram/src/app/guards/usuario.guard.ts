import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements  CanActivate, CanLoad {

  constructor(private usuarioService: UsuarioService) {

  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.usuarioService.validaToken();
  }

  canActivate(
      // next: ActivatedRouteSnapshot,
      // state: RouterStateSnapshot
      ): Observable<boolean> | Promise<boolean> | boolean {
    return false; // no puede abrir la ruta que explore
  }

}

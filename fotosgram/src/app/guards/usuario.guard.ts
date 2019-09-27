import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements  CanActivate, CanLoad {

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return false;
  }

  canActivate(
      // next: ActivatedRouteSnapshot,
      // state: RouterStateSnapshot
      ): Observable<boolean> | Promise<boolean> | boolean {
    return false; // no puede abrir la ruta que explore
  }

}

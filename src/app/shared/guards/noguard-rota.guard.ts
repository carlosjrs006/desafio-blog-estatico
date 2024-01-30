import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class NoGuardRotaGuard implements CanActivate {


  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
   
    if(!this.authService.isTokenExpired()){
    if (this.authService.getToken() !== null) {
      this.router.navigate(['/blog']);
      return false;
     }
   }

    return true;
  }
}

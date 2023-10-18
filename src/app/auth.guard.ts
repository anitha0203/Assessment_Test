import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: UtilService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      const expectedRole = route.data['role'];
      const userRole = this.authService.getRole();

      if (userRole === expectedRole) {
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userData;
  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    this.apiService.userDataAfterLoggedIn.subscribe((user) => {
      this.userData = user;
      //console.log(this.userData, 'this.userData1');
    })
    if (this.userData) {
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;

    // if (localStorage.getItem('user')){
    //   return true;
    // }
    // this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}})
    // return false;
  }

}

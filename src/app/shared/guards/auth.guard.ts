import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../serivces/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    private readonly loginRoutes = ['/login', '/signup'];
    constructor(
        private authorizationService: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authorizationService.authStatus().map(auth => {
            const isLoginState = this.loginRoutes.indexOf(state.url) > -1;
            if (auth && isLoginState) {
                this.router.navigateByUrl('/');
                return false;
            } else if (auth || isLoginState) {
                return true;
            } else {
                this.router.navigateByUrl('/login');
                return false;
            }
        }).first();
    }
}
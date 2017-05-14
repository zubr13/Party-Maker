import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from "@angular/router";
import {AuthService} from "../../../shared/serivces/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @ViewChild('sidenav') private sidenav;
  public routes: Array<Object>;
  public title: string;
  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private authService: AuthService
  ) {
    this.routes = route.routeConfig['children'].reduce((acc, item) => {
      if (item.data && item.data.name) {
        acc.push({
          name: item.data.name,
          path: item.path
        })
      }
      return acc;
    }, []);

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const splitted = val.url.split('/');
        const path = splitted[splitted.length - 1];
        const current = this.route.routeConfig['children'].filter(elem => elem.path === path)[0];
        if (current && current.data) {
          this.title = current.data.name;
        }
      }
    });
  }

  goTo(path) {
    this.sidenav.close();
    this.router.navigate(['/app', path]);
  }

  logout() {
    this.authService.logout()
        .first()
        .subscribe(() => this.router.navigate(['/login']));
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../shared/serivces/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('sidenav') private sidenav;
  public routes: Array<Object>;
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
    console.log(route.routeConfig['children'], this.routes);
  }

  ngOnInit() {
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { APP_ROUTES } from '../../../core/router/routes.enum';

interface NavBarNavButton {
  routerLink: APP_ROUTES;
  text: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  public currentURL = '';
  public navBarLinks: Array<NavBarNavButton> = [
    {
      routerLink: APP_ROUTES.PHOTOS,
      text: 'Photos'
    },
    {
      routerLink: APP_ROUTES.FAVORITES,
      text: 'Favorites'
    }
  ];

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart),
      takeUntil(this.destroyed$),
    ).subscribe((event) => {
      this.currentURL = (event as NavigationStart).url.slice(1);
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

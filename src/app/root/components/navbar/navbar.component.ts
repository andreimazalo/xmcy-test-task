import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  public currentURL = '';

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart),
      takeUntil(this.destroyed$),
    ).subscribe((event) => {
      this.currentURL = (event as NavigationStart).url;
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

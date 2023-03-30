import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { activatedRouteMockConstructor, routerMockSpyConstructor } from '../../../core/test/common-mocks.spec';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  const routerMock = routerMockSpyConstructor();
  const activatedRouteSpy = activatedRouteMockConstructor();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [
        {provide: Router, useValue: routerMock},
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
      ],
      imports: [
        MatToolbarModule,
        RouterModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('when component is loaded', () => {
    it('should read current URL from router', () => {
      expect(component.currentURL).toEqual('test');
    });
  })

  describe('when url is set to ""', () => {
    it('should only highlight Photos navigation button', () => {
      component.currentURL = '';
      const photosButton = fixture.debugElement.query(By.css('[data-test=photos-nav-button]'));
      const favoritesButton = fixture.debugElement.query(By.css('[data-test=favorites-nav-button]'));

      fixture.detectChanges();

      expect(photosButton.nativeElement.classList).toContain('button-selected');
      expect(favoritesButton.nativeElement.classList).not.toContain('button-selected');
    });
  })

  describe('when url is set to favorites', () => {
    it('should only highlight Favorites button', () => {
      component.currentURL = 'favorites';
      const photosButton = fixture.debugElement.query(By.css('[data-test=photos-nav-button]'));
      const favoritesButton = fixture.debugElement.query(By.css('[data-test=favorites-nav-button]'));

      fixture.detectChanges();

      expect(favoritesButton.nativeElement.classList).toContain('button-selected');
      expect(photosButton.nativeElement.classList).not.toContain('button-selected');
    });
  })
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesGridComponent } from './favourites-grid.component';
import { ImageCardModule } from '../../../core/components/molecules/image-card/image-card.module';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('FavouritesGridComponent', () => {
  let component: FavouritesGridComponent;
  let fixture: ComponentFixture<FavouritesGridComponent>;
  let getItemSpy;
  const routerSpy = {
    navigate: jasmine.createSpy('navigate').and.callFake((uri) => {})
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouritesGridComponent ],
      providers: [
        {provide: Router, useValue: routerSpy},
      ],
      imports: [ ImageCardModule ]
    })
    .compileComponents();

    getItemSpy = spyOn(localStorage, 'getItem');
    getItemSpy.and.callFake((key: string): string => {
      return JSON.stringify({
        '1': 'test 1',
        '2': 'test 2',
      });
    });

    fixture = TestBed.createComponent(FavouritesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('when FavouritesGridComponent is rendered', () => {
    it('should display favorite cards retrieved from localStorage', () => {
      const cards = fixture.debugElement.queryAll(By.css('[data-test=favourite-photos-image-card]'));

      expect(cards.length).toEqual(2);
    });
  });

  describe('when favourite photo is clicked', () => {
    it('should call navigation to the single photo page', () => {
      const card = fixture.debugElement.query(By.css('[data-test=favourite-photos-image-card]'));
      const goToSinglePhotoPageSpy = spyOn(component, 'goToSinglePhotoPage');

      card.triggerEventHandler('cardClicked');
      fixture.detectChanges();

      expect(goToSinglePhotoPageSpy).toHaveBeenCalled();
    });
  });

  describe('when goToSinglePhotoPage is called', () => {
    it('should call router to navigate user to single photo page', () => {
      component.goToSinglePhotoPage('1');

      expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/photos/1']);
    })
  })
});

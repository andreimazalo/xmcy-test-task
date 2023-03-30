import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SinglePhotoViewComponent } from './single-photo-view.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ImageCardModule } from '../../../core/components/molecules/image-card/image-card.module';
import { favoritePhotosMapKey } from '../../../core/constants/local-storage-keys';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { By } from '@angular/platform-browser';

describe('SinglePhotoViewComponent', () => {
  let component: SinglePhotoViewComponent;
  let fixture: ComponentFixture<SinglePhotoViewComponent>;

  const activatedRouteMock = {
    params: of({id: '1'})
  };

  const localStorageServiceSpy = {
    getFromMap: jasmine.createSpy('getFromMap').and.callFake((mapName: string, key: string) => ''),
    removeFromMap: jasmine.createSpy('removeFromMap').and.callFake((key: string) => {}),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePhotoViewComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteMock},
        {provide: LocalStorageService, useValue: localStorageServiceSpy},
      ],
      imports: [
        ImageCardModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePhotoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('when component is displayed', () => {
    it('should retrieve photo by routerParam id from localStorage', () => {
      expect(localStorageServiceSpy.getFromMap).toHaveBeenCalledWith(favoritePhotosMapKey, '1');
    });
  });

  describe('when delete photo button is clicked', () => {
    it('should call for photo deletion', () => {
      const button = fixture.debugElement.query(By.css('[data-test=single-photo-delete-button]'));

      button.nativeElement.click();
      fixture.detectChanges();

      expect(localStorageServiceSpy.removeFromMap).toHaveBeenCalledWith(favoritePhotosMapKey, '1');
    });
  });
});

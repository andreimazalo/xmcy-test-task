import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { defaultPageSize, loadMockDelay, PhotosInfiniteScrollComponent } from './photos-infinite-scroll.component';
import { ImageService } from '../../../core/services/image.service';
import { By } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImageCardModule } from '../../../core/components/molecules/image-card/image-card.module';
import { ImageCardClickedEvent } from '../../../core/components/molecules/image-card/image-card.component';
import  * as localStorageKeys  from '../../../core/constants/local-storage-keys';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { imageServiceSpyConstructor, localStorageServiceSpyConstructor } from '../../../core/test/common-mocks.spec';

describe('PhotosInfiniteScrollComponent', () => {
  let component: PhotosInfiniteScrollComponent;
  let fixture: ComponentFixture<PhotosInfiniteScrollComponent>;
  let imageServiceSpy = imageServiceSpyConstructor();
  let localStorageServiceSpy = localStorageServiceSpyConstructor();
  let mockScrollEvent: Event;
  let addImagesPageSpy: jasmine.Spy<() => void>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosInfiniteScrollComponent ],
      providers: [
        {provide: ImageService, useValue: imageServiceSpy},
        {provide: LocalStorageService, useValue: localStorageServiceSpy},
      ],
      imports: [
        MatProgressSpinnerModule,
        ImageCardModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosInfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('when PhotosInfiniteScrollComponent is first loaded', () => {
    it('should render the first page of cards of default size', () => {
      const cards = fixture.debugElement.queryAll(By.css('[data-test=infinite-scroll-image-card]'));

      expect(cards.length).toEqual(defaultPageSize);
    });
  });

  describe('when PhotosInfiniteScrollComponent is scrolled to bottom', () => {
    it('should call for load of next page of cards',() => {
      const infiniteScrollContainer = fixture.debugElement.query(By.css('[data-test=infinite-scroll-container]'));
      const loadMoreSpy = spyOn(component, 'loadMoreIfReachedTheEnd');

      infiniteScrollContainer.triggerEventHandler('scroll');
      fixture.detectChanges();

      expect(loadMoreSpy).toHaveBeenCalled();
    });
  });

  describe('when image card is clicked', () => {
    it('should save image to localStorage list', () => {
      const card = fixture.debugElement.query(By.css('[data-test=infinite-scroll-image-card]'));
      const saveImageToFavoritesSpy = spyOn(component, 'saveImageToFavorites');

      card.triggerEventHandler('cardClicked');
      fixture.detectChanges();

      expect(saveImageToFavoritesSpy).toHaveBeenCalled();
    });
  });

  describe('when saveImageToFavorites method is called', () => {
    it('should save image to localStorage',  () => {
      const mockCardClickedEvent = {
        imgSrc: 'base64:/test-test',
        imgId: 'mockId',
        domEvent: {} as Event
      } as ImageCardClickedEvent;

      component.saveImageToFavorites(mockCardClickedEvent);

      expect(localStorageServiceSpy.pushToMap).toHaveBeenCalledWith(localStorageKeys.favoritePhotosMapKey, 'mockId', 'base64:/test-test');
    });
  });

  describe('when addImagesPage method is called', () => {
    it('should append default number of image ids to the array', () => {
      component.imageIDs = [];

      component.addImagesPage();

      expect(component.imageIDs.length).toEqual(defaultPageSize);
    });
  });

  describe('loadMoreIfReachedTheEnd method', () => {
    beforeEach(() => {
      addImagesPageSpy = spyOn(component, 'addImagesPage');

      mockScrollEvent = {
        target: {
          scrollHeight: 1740,
          offsetHeight: 625,
          scrollTop: 900,
        }
      } as unknown as Event;
    });

    describe('when called with event indicating scroll to the bottom', () => {
      it('should load the next page of cards', fakeAsync(() => {
        component.loadMoreIfReachedTheEnd(mockScrollEvent);

        tick(loadMockDelay);

        expect(addImagesPageSpy).toHaveBeenCalled();
      }));
    });

    describe('when called with loading already in progress and valid scroll event', () => {
      it('should not load next page', fakeAsync(() => {
        component.isLoadingNextPage = true;
        (mockScrollEvent.target as HTMLDivElement).scrollTop = 1000;

        component.loadMoreIfReachedTheEnd(mockScrollEvent);
        tick(loadMockDelay);

        expect(addImagesPageSpy).not.toHaveBeenCalled();
      }));
    });

    describe('when called with event which does NOT indicate scroll to the bottom', () => {
      it('should not load next page', fakeAsync(() => {
        (mockScrollEvent.target as HTMLDivElement).scrollTop = 100;

        component.loadMoreIfReachedTheEnd(mockScrollEvent);
        tick(loadMockDelay);

        expect(addImagesPageSpy).not.toHaveBeenCalled();
      }));
    });
  });
});

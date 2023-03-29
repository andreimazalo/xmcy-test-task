import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosComponent } from './photos.component';
import { PhotosInfiniteScrollComponent } from './components/photos-infinite-scroll/photos-infinite-scroll.component';
import { of } from 'rxjs';
import { ImageService } from '../core/services/image.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImageCardModule } from '../core/components/molecules/image-card/image-card.module';

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;

  let imageServiceSpy = {
    getRandomImage: jasmine.createSpy('getRandomImage').and.callFake((width: number, height: number) => {
      return of(new Blob())
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosComponent, PhotosInfiniteScrollComponent ],
      providers: [
        {provide: ImageService, useValue: imageServiceSpy},
      ],
      imports: [
        MatProgressSpinnerModule,
        ImageCardModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

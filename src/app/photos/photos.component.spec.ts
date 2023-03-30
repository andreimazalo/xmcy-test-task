import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotosComponent } from './photos.component';
import { PhotosInfiniteScrollComponent } from './components/photos-infinite-scroll/photos-infinite-scroll.component';
import { ImageService } from '../core/services/image.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImageCardModule } from '../core/components/molecules/image-card/image-card.module';
import { imageServiceSpyConstructor } from '../core/test/common-mocks.spec';

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;

  let imageServiceSpy = imageServiceSpyConstructor();

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

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesComponent } from './favourites.component';
import { FavouritesGridComponent } from './components/favourites-grid/favourites-grid.component';
import { ImageCardModule } from '../core/components/molecules/image-card/image-card.module';

describe('FavouritesComponent', () => {
  let component: FavouritesComponent;
  let fixture: ComponentFixture<FavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouritesComponent, FavouritesGridComponent ],
      imports: [
        ImageCardModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavouritesComponent } from './favourites.component';
import { FavouritesGridComponent } from './components/favourites-grid/favourites-grid.component';
import { ImageCardModule } from '../core/components/molecules/image-card/image-card.module';
import { getItemSpyConstructor } from '../core/test/common-mocks.spec';

describe('FavouritesComponent', () => {
  let component: FavouritesComponent;
  let fixture: ComponentFixture<FavouritesComponent>;
  let getItemSpy: jasmine.Spy<(key: string) => (string | null)>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouritesComponent, FavouritesGridComponent ],
      imports: [
        ImageCardModule
      ]
    })
    .compileComponents();

    getItemSpy = getItemSpyConstructor();

    fixture = TestBed.createComponent(FavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

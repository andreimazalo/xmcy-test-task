import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouritesComponent } from './favourites.component';
import { FavouritesRoutingModule } from './favourites-routing.module';
import { FavouritesGridComponent } from './components/favourites-grid/favourites-grid.component';
import { ImageCardModule } from '../core/components/molecules/image-card/image-card.module';



@NgModule({
  declarations: [
    FavouritesComponent,
    FavouritesGridComponent,
  ],
  imports: [
    CommonModule,
    FavouritesRoutingModule,
    ImageCardModule
  ]
})
export class FavouritesModule { }

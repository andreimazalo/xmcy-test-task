import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouritesComponent } from './favourites.component';
import { FavouritesRoutingModule } from './favourites-routing.module';



@NgModule({
  declarations: [
    FavouritesComponent
  ],
  imports: [
    CommonModule,
    FavouritesRoutingModule
  ]
})
export class FavouritesModule { }

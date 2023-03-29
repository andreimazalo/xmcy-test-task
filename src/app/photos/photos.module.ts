import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos.component';
import { PhotosRoutingModule } from './photos-routing.module';
import { ImageCardModule } from '../core/components/molecules/image-card/image-card.module';
import { PhotosInfiniteScrollComponent } from './components/photos-infinite-scroll/photos-infinite-scroll.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    PhotosComponent,
    PhotosInfiniteScrollComponent
  ],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    ImageCardModule,
    MatGridListModule,
    MatProgressSpinnerModule
  ]
})
export class PhotosModule { }

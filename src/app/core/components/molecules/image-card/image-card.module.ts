import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCardComponent } from './image-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ImageCardComponent
  ],
  exports: [
    ImageCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
  ]
})
export class ImageCardModule { }

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Image } from '../../../domain/image.interface';
export interface ImageCardClickedEvent extends Image {
  domEvent: Event;
}

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent {
  @Input() imgSrc: string | null = '';
  @Input() clickActionText: string = '';
  @Input() afterActionText: string = '';
  @Input() imgId: string = '';
  @Input() displayHoverOverlay = true;
  @Input() width = 200;
  @Input() height = 300;
  @Output() cardClicked = new EventEmitter<ImageCardClickedEvent>();

  public isHovered = false;
  public isActionDone = false;

  public handleCardClick(e: Event): void {
    this.cardClicked.emit({domEvent: e, imgSrc: this.imgSrc, imgId: this.imgId});
    this.isActionDone = true;
  }
}

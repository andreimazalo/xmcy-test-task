import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface ImageCardClickedEvent {
  imgSrc: Blob | null;
  imgId: string;
  domEvent: Event;
}

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnChanges {
  @Input() imgSrc: Blob | null = null;
  @Input() clickActionText: string = '';
  @Input() afterActionText: string = '';
  @Input() imgId: string = '';
  @Output() cardClicked = new EventEmitter<ImageCardClickedEvent>();

  public isHovered = false;
  public isActionDone = false;
  public bypassedUrl: SafeUrl | null = null;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes['imgSrc']) {
      this.getImageDOMLink();
    }
  }

  public getImageDOMLink() {
    if(this.imgSrc) {
      const fileUrl = URL.createObjectURL(this.imgSrc);
      this.bypassedUrl = this.sanitizer.bypassSecurityTrustUrl(fileUrl);
    }
  }

  public handleCardClick(e: Event): void {
    this.cardClicked.emit({domEvent: e, imgSrc: this.imgSrc, imgId: this.imgId});
    this.isActionDone = true;
  }
}

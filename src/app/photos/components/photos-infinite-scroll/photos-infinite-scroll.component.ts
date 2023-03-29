import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from '../../../core/services/image.service';
import { ImageCardClickedEvent } from '../../../core/components/molecules/image-card/image-card.component';
import { v4 as uuidv4 } from 'uuid';
import  * as localStorageUtil  from '../../../core/utils/local-storage.util';
import  * as localStorageKeys  from '../../../core/constants/local-storage-keys';

export interface PhotosInfiniteScrollConfig {
  photoWidth: number;
  photoHeight: number;
}

export const loadMockDelay = 300;
export const defaultPageSize = 12;

@Component({
  selector: 'app-photos-infinite-scroll',
  templateUrl: './photos-infinite-scroll.component.html',
  styleUrls: ['./photos-infinite-scroll.component.scss']
})
export class PhotosInfiniteScrollComponent implements OnInit {
  @Input() config: PhotosInfiniteScrollConfig = {
    photoWidth: 200,
    photoHeight: 300,
  };
  public loadPageSize = defaultPageSize;
  public imageIDs: Array<string> = [];
  public isLoadingNextPage = false;
  public loadImageSource$ = this.imageService.getRandomImage(this.config.photoWidth, this.config.photoHeight);

  constructor(public imageService: ImageService) {
  }

  ngOnInit() {
    this.addImagesPage();
  }

  public addImagesPage() {
    for(let i = 0; i < this.loadPageSize; i++) {
      this.imageIDs.push(uuidv4());
    }
  }

  public loadMoreIfReachedTheEnd(event: Event): void {
    const target = event.target as HTMLDivElement;
    const isTheEndReached = target.scrollHeight - (target.offsetHeight + target.scrollTop) < this.config.photoHeight;

    if(!this.isLoadingNextPage && isTheEndReached) {
      this.isLoadingNextPage = true;

      setTimeout(() => {
        this.addImagesPage();
        this.isLoadingNextPage = false;
      }, loadMockDelay);
    }
  }

  public saveImageToFavorites({imgId, imgSrc}: ImageCardClickedEvent) {
    imgSrc?.text().then((blobText) => {
      localStorageUtil.pushToMap(localStorageKeys.favoritePhotosMapKey, imgId, blobText);
    });
  }
}

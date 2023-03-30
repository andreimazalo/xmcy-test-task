import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as localStorageKeys from '../../../core/constants/local-storage-keys';
import { LocalStorageService } from '../../../core/services/local-storage.service';

const singlePhotoViewImageWidth = 300;
const singlePhotoViewImageHeight = 450;

@Component({
  selector: 'app-single-photo-view',
  templateUrl: './single-photo-view.component.html',
  styleUrls: ['./single-photo-view.component.scss']
})
export class SinglePhotoViewComponent implements OnInit {
  public imgId = '';
  public imgSrc = '';

  constructor(private activatedRoute: ActivatedRoute, private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.imgId = params['id'];
      this.imgSrc = this.localStorageService.getFromMap(localStorageKeys.favoritePhotosMapKey, this.imgId);
    });
  }

  public deletePhoto(): void {
    this.localStorageService.removeFromMap(localStorageKeys.favoritePhotosMapKey, this.imgId)
  }

  protected readonly singlePhotoViewImageHeight = singlePhotoViewImageHeight;
  protected readonly singlePhotoViewImageWidth = singlePhotoViewImageWidth;
}

import { Component, OnInit } from '@angular/core';
import * as localStorageKeys from '../../../core/constants/local-storage-keys';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../core/router/routes.enum';

@Component({
  selector: 'app-favourites-grid',
  templateUrl: './favourites-grid.component.html',
  styleUrls: ['./favourites-grid.component.scss']
})
export class FavouritesGridComponent implements OnInit {
  public favoritePhotos: Record<string, string> = {};
  public isFavoritesListEmpty = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.favoritePhotos = JSON.parse(localStorage.getItem(localStorageKeys.favoritePhotosMapKey) ?? '') ?? {};
    this.isFavoritesListEmpty = Object.keys(this.favoritePhotos).length === 0;
  }
  public goToSinglePhotoPage(imgId: string) {
    this.router.navigate([`/${APP_ROUTES.SINGLE_PHOTO}/${imgId}`]);
  }
}

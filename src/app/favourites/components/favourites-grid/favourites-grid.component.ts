import { Component, OnInit } from '@angular/core';
import * as localStorageKeys from '../../../core/constants/local-storage-keys';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites-grid',
  templateUrl: './favourites-grid.component.html',
  styleUrls: ['./favourites-grid.component.scss']
})
export class FavouritesGridComponent implements OnInit {
  public favoritePhotos: Record<string, string> = {};

  constructor(private router: Router) {}

  ngOnInit() {
    this.favoritePhotos = JSON.parse(localStorage.getItem(localStorageKeys.favoritePhotosMapKey) ?? '') ?? {};
  }
  public goToSinglePhotoPage(imgId: string) {
    this.router.navigate(['/photos/' + imgId]);
  }

}

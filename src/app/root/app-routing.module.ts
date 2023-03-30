import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SinglePhotoViewComponent } from './components/single-photo-view/single-photo-view.component';
import { APP_ROUTES } from '../core/router/routes.enum';

const routes: Routes = [
  {
    path: APP_ROUTES.PHOTOS,
    loadChildren: () => import('../photos/photos.module').then(m => m.PhotosModule)
  },
  {
    path: APP_ROUTES.FAVORITES,
    loadChildren: () => import('../favourites/favourites.module').then(m => m.FavouritesModule),
  },
  {
    path: `${APP_ROUTES.SINGLE_PHOTO}/:id`,
    component: SinglePhotoViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

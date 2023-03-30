import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SinglePhotoViewComponent } from './components/single-photo-view/single-photo-view.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../photos/photos.module').then(m => m.PhotosModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('../favourites/favourites.module').then(m => m.FavouritesModule),
  },
  {
    path: 'photos/:id',
    component: SinglePhotoViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

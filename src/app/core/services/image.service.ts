import { Injectable } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private serviceURL = 'https://picsum.photos';

  constructor(private http: HttpClient) { }

  public getRandomImage(width: number, height: number): Observable<Blob | null>{
    return this.http.get(`${this.serviceURL}/${width}/${height}?random=${Math.random() % 10}`, {observe: 'response', responseType: 'blob'}).pipe(
      map(resp => resp.body)
    );
  }
}

import { Injectable } from '@angular/core';
import { fromEvent, map, Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

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

  public convertImgToBase64(imgBlob: Blob | null): Observable<string> {
    let reader = new FileReader();

    reader.readAsDataURL(imgBlob ?? new Blob());

    return fromEvent(reader, 'load').pipe(
      map(() => {
        return reader.result as string;
      })
    );
  }
}

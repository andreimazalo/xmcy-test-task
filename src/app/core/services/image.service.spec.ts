import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ImageService', () => {
  let service: ImageService;
  let httpClientSpy = {
    get: jasmine.createSpy('get').and.callFake((url, options) => {
      return of({
        body: new Blob()
      });
    })
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    });
    service = TestBed.inject(ImageService);
  });

  describe('getRandomImage', () => {
    it('should query for random image with parameters specified', () => {
      service.getRandomImage(200, 300).subscribe((resp) => {
        expect(resp).toBeTruthy();
      });

      expect(httpClientSpy.get).toHaveBeenCalled();
    });
  })

});

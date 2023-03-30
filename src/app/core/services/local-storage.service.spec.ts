import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';
import { favoritePhotosMapKey } from '../constants/local-storage-keys';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let getItemSpy: jasmine.Spy<(key: string) => (string | null)>;
  let setItemSpy: jasmine.Spy<(key: string, value: string) => void>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    getItemSpy = spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return JSON.stringify({
        '1': 'test 1',
      });
    });

    setItemSpy = spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {});
  });

  describe('when pushToMap method is called', () => {
    it('should append key-value to the map and update localStorage', () => {
      service.pushToMap(favoritePhotosMapKey, '2', 'test 2');

      expect(setItemSpy).toHaveBeenCalledWith(favoritePhotosMapKey, '{"1":"test 1","2":"test 2"}');
    });
  });

  describe('when getFromMap method is called', () => {
    it('should retrieve map and return value by key specified', () => {
      const res = service.getFromMap(favoritePhotosMapKey, '1');

      expect(res).toEqual('test 1');
    });
  });

  describe('when removeFromMap method is called', () => {
    it('should remove value from map and update it in localStorage', () => {
      service.removeFromMap(favoritePhotosMapKey, '1');

      expect(setItemSpy).toHaveBeenCalledWith(favoritePhotosMapKey, '{}');
    });
  });
});

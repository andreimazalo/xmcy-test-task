import { of } from 'rxjs';
import { NavigationStart } from '@angular/router';

export function getItemSpyConstructor() {
  return spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
    return JSON.stringify({
      '1': 'test 1',
      '2': 'test 2',
    });
  });
}

export function localStorageServiceSpyConstructor() {
  return {
    getFromMap: jasmine.createSpy('getFromMap').and.callFake((mapName: string, key: string) => ''),
    removeFromMap: jasmine.createSpy('removeFromMap').and.callFake((key: string) => {}),
    pushToMap: jasmine.createSpy('pushToMap').and.callFake((mapKey, key, value) => {}),
  }
}

export function activatedRouteMockConstructor() {
  return {
    params: of({id: '1'})
  };
}

export function routerMockSpyConstructor() {
  return {
    events: of(new NavigationStart(1, 'test')),
    navigate: jasmine.createSpy('navigate').and.callFake((uri) => {})
  };
}

export function imageServiceSpyConstructor() {
  return {
    getRandomImage: jasmine.createSpy('getRandomImage').and.callFake((width: number, height: number) => {
      return of('')
    }),
  };
}

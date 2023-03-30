import { of } from 'rxjs';
import { NavigationStart, UrlCreationOptions, UrlTree } from '@angular/router';

export function getItemSpyConstructor(customReturn?: any) {
  return spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
    return JSON.stringify(customReturn ?? {
      '1': 'test 1',
      '2': 'test 2',
    });
  });
}

export function setItemSpyConstructor() {
  return spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {});
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
    events: of(new NavigationStart(1, '/test')),
    navigate: jasmine.createSpy('navigate').and.callFake((uri) => {}),
    createUrlTree: jasmine.createSpy('createUrlTree').and.callFake((commands: any[], navigationExtras: UrlCreationOptions) =>{
      return {} as UrlTree;
    }),
    serializeUrl: jasmine.createSpy('serializeUrl').and.callFake((url: UrlTree) => '')
  };
}

export function imageServiceSpyConstructor() {
  return {
    getRandomImage: jasmine.createSpy('getRandomImage').and.callFake((width: number, height: number) => {
      return of('')
    }),
  };
}

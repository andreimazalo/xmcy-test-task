import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  public pushToMap(mapName: string, key: string, item: string) {
    const map = this.getMap(mapName);
    map[key] = item;
    localStorage.setItem(mapName, JSON.stringify(map));
  }

  public getFromMap(mapName: string, key: string) {
    const map = this.getMap(mapName);

    return map[key];
  }

  public removeFromMap(mapName: string, key: string) {
    const map = this.getMap(mapName);
    delete map[key];
    localStorage.setItem(mapName, JSON.stringify(map));
  }

  private getMap(mapName: string) {
    const mapString = localStorage.getItem(mapName);
    let map: Record<string, string> = {};

    if(mapString) {
      map = JSON.parse(mapString);
    }

    return map;
  }
}

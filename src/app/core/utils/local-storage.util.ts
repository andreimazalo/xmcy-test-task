export function pushToMap(mapName: string, key: string, item: string) {
  const mapString = localStorage.getItem(mapName);
  let map: Record<string, string> = {};

  if(mapString) {
    map = JSON.parse(mapString);
  }

  map[key] = item;
  localStorage.setItem(mapName, JSON.stringify(map));
}

class Terrain {

  height: number;
  width: number;
  map: string[];

  constructor(map: string[]) {
    this.height = map.length;
    this.width = map.reduce((acc: number, row: string) => {
      if (acc === undefined) {
        return row.length
      } else if (row.length !== acc) {
        throw Error('Invalid terrain, inconsistent height');
      }
      return acc;
    }, undefined);
    this.map = map;
  }

}

export default Terrain;
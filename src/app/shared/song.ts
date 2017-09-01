export class Song {

  id = 0;
  title = '';
  bartime = 0;
  tabulature = '';

  // shallow copy constructor
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

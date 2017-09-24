
export class Song {

  title = '';
  bartime = 0;
  tabulature = '';

   constructor(title: string, bartime: number, tabulature: string) {
    this.title = title;
    this.bartime = bartime;
    this.tabulature = tabulature;
  }

}

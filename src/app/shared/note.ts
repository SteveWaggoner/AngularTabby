export class Note {

  public lineIndex = -1;
  public tabStripIndex = -1;
  public position = -1;
  public stringIndex = -1;

  public index = -1;

  public fretValue = -1;
  private noteType = -1; // 0 = note, 1 = text
  public text = '';
  public digits = 0;

  constructor(lineIndex: number, tabStripIndex: number, stringIndex: number, position: number, text: string) {
    this.lineIndex = lineIndex;
    this.tabStripIndex = tabStripIndex;
    this.stringIndex = stringIndex;
    this.position = position;
    this.text = text;
    this.fretValue = parseInt(text, 10);
    if ( ! isNaN(this.fretValue)) {
      this.noteType = 0;
      this.digits = text.length;
    } else {
      this.noteType = 1;
    }
  }

  static compare(a: Note, b: Note): number {

    if ( a.noteType === b.noteType ) {

      if (a.tabStripIndex === b.tabStripIndex) {
        if (a.position === b.position) {
          return a.stringIndex - b.stringIndex;
        } else {
          return a.position - b.position;
        }
      } else {
        return a.tabStripIndex - b.tabStripIndex;
      }
    } else {
      return a.noteType - b.noteType;
    }

  }

}

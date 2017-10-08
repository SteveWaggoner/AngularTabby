
export class TabParser {

  static parseLine(lineIndex: number, tabStripIndex: number, stringIndex: number, line: string): TabNote[] {
    const notes: TabNote[] = [];
    const parts = line.split(/([0-9]+)/);
    let position = 0;
    parts.forEach((val, ndx) => {
      const note = new TabNote(lineIndex, tabStripIndex, stringIndex, position, val);
      notes.push(note);
      position += val.length;
    });
    return notes;
  }

  static parseTuning(tab: string): string {

    const lines = tab.split('\n');

    let tuning = '';
    let done = false;

    lines.forEach((line, lineIndex) => {
      const lineHasNotes = line.indexOf('-') >= 0 && line.indexOf('|') >= 0;
      if (lineHasNotes) {

        if ('abcdefgABCDEFG'.indexOf(line.trim()[0]) >= 0 && !done) {
          tuning = line.trim()[0].toUpperCase() + tuning;
        }
      } else {
        if (tuning.length > 0) {
          done = true;
        }
      }
    });
    return tuning;
  }

  static parseTabulature(tab: string): TabLine[] {

    const lines = tab.split('\n');

    let inStrip = false;
    let tabStripIndex = -1;
    let stringIndex = -1;

    let tuning = '';

    const parsedLines: TabLine[] = [];

    lines.forEach((line, lineIndex) => {

      const lineHasNotes = line.indexOf('-') >= 0 && line.indexOf('|') >= 0;
      if (lineHasNotes) {

        if ( 'abcdefgABCDEFG'.indexOf(line.trim()[0])) {
          tuning = line.trim()[0].toUpperCase() + tuning;
        }

        const firstLineInStrip = !inStrip;
        inStrip = true;

        if (firstLineInStrip) {
          tabStripIndex++;
          stringIndex = 0;
        } else {
          stringIndex++;
        }

      } else {
        inStrip = false;
      }

      const notes = TabParser.parseLine(lineIndex, tabStripIndex, stringIndex, line);
      parsedLines.push(new TabLine(tabStripIndex, stringIndex, notes));
    });

    // update the node.index
    let notes: TabNote[] = [];
    parsedLines.forEach((line, lineIndex) => {
      notes = notes.concat(line.notes);
    });
    notes.sort(TabNote.compare);
    notes.forEach((ni, index) => {
      ni.index = index;
    });
    //

    return parsedLines;
  }

  static generateNoteTable(lines: TabLine[]): Map<number, Map<number, TabNote>> {

    const lu = new Map<number, Map<number, TabNote>>();
    lines.forEach((line, lineIndex) => {

      line.notes.forEach((ni, index) => {

        if (!lu.has(ni.lineIndex)) {
          lu.set(ni.lineIndex, new Map<number, TabNote>());
        }
        lu.get(ni.lineIndex).set(ni.position, ni);
      });
    });
    return lu;
  }


  static generateStepTable(lines: TabLine[]): Map<number, TabNote[]> {

    const prevStringStep: number[] = [0, 0, 0, 0, 0, 0];
    const lu = new Map<number, TabNote[]>();
    lines.forEach((line, lineIndex) => {

      line.notes.forEach((note, index) => {

        const noteStep = prevStringStep[line.stringIndex];

        if (note.fretValue >= 0) {
          if (!lu.has(noteStep)) {
            lu.set(noteStep, []);
          }
          lu.get(noteStep).push(note);
        }

        prevStringStep[line.stringIndex] += note.text.length;

      });
    });
    return lu;
  }

}

export class TabLine {

  constructor(public tabStripIndex: number, public stringIndex: number, public notes: TabNote[]) {
  }

}

export class TabNote {

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

  static compare(a: TabNote, b: TabNote): number {

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


import {Note} from './note';
import {Line} from './line';

export class TabParser {

  static parseLine(lineIndex: number, tabStripIndex: number, stringIndex: number, line: string): Note[] {
    const notes: Note[] = [];
    const parts = line.split(/([0-9]+)/);
    let position = 0;
    parts.forEach((val, ndx) => {
      const note = new Note(lineIndex, tabStripIndex, stringIndex, position, val)
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

  static parseTabulature(tab: string): Line[] {

    const lines = tab.split('\n');

    let inStrip = false;
    let tabStripIndex = -1;
    let stringIndex = -1;

    let tuning = '';

    const parsedLines: Line[] = [];

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

      const notes = TabParser.parseLine(lineIndex, tabStripIndex, stringIndex, line)
      parsedLines.push(new Line(tabStripIndex, stringIndex, notes));
    });

    // update the node.index
    let notes: Note[] = [];
    parsedLines.forEach((line, lineIndex) => {
      notes = notes.concat(line.notes);
    });
    notes.sort(Note.compare);
    notes.forEach((ni, index) => {
      ni.index = index;
    });
    //

    return parsedLines;
  }

  static generateNoteTable(lines: Line[]): Map<number, Map<number, Note>> {

    const lu = new Map<number, Map<number, Note>>();
    lines.forEach((line, lineIndex) => {

      line.notes.forEach((ni, index) => {

        if (!lu.has(ni.lineIndex)) {
          lu.set(ni.lineIndex, new Map<number, Note>());
        }
        lu.get(ni.lineIndex).set(ni.position, ni);
      });
    });
    return lu;
  }


  static generateStepTable(lines: Line[]): Map<number, Note[]> {

    const prevStringStep: number[] = [0, 0, 0, 0, 0, 0];
    const lu = new Map<number, Note[]>();
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

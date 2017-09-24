import {Note} from './note';

export class Line {

  constructor(public tabStripIndex: number, public stringIndex: number, public notes: Note[]) {
  }

}

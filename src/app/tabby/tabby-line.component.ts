import {Component, Input} from '@angular/core';
import {TabLine} from '../shared/tabparser';

@Component(
  {
    selector: 'app-tabby-line',
    template: `<app-tabby-note *ngFor="let note of line.notes" [note]="note" ></app-tabby-note><br>`
  }
)
export class TabbyLineComponent  {

  @Input() line: TabLine;

}


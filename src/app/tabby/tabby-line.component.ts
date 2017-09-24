import {Component, Input} from '@angular/core';
import {Line} from '../shared/line';

@Component(
  {
    selector: 'app-tabby-line',
    template: `<app-tabby-note *ngFor="let note of line.notes" [note]="note" ></app-tabby-note><br>`
  }
)
export class TabbyLineComponent {
  @Input() line: Line;
}


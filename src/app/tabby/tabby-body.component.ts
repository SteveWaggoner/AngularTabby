import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Song} from '../shared/song';

@Component(
  {
    selector: 'app-tabby-body',
    template: `<P>Hello from Body</P>`,
    styleUrls: []
  }
)
export class TabbyBodyComponent {

  constructor() {
  }
}

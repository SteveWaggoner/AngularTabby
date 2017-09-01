import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Song} from '../shared/song';

@Component(
  {
    selector: 'app-tabby-footer',
    template: `<P>Hello from Footer</P>`,
    styleUrls: []
  }
)
export class TabbyFooterComponent {

  constructor() {
  }
}

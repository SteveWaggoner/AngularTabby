import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component(
  {
    selector: 'app-tabby-footer',
    template: `<P>Hello from Footer</P>

    <button (click)="handleClick($event)" type="button">
      Click me
    </button>
    `,
    styleUrls: []
  }
)
export class TabbyFooterComponent {

  @Input() className: string;
  @Input() type: string;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  handleClick(event: any) {
    this.onClick.emit(event);
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Song} from '../shared/song';

@Component(
  {
    selector: 'app-tabby-header',
    template: `<P>Hello from Header</P>`,
    styleUrls: []
  }
)
export class TabbyHeaderComponent {

  @Input()
  songs: Song[];


  @Output()
  selectSong: EventEmitter<Song> = new EventEmitter();

  constructor() {
  }

  onSelectSong(song: Song) {
    this.selectSong.emit(song);
  }

}

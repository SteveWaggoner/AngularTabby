import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Song} from '../shared/song';
import {SongService} from '../shared/song.service';

@Component(
  {
    selector: 'app-tabby-header',
    template: `<P>Hello from Header</P>

    <select class="form-control" name="song" [(ngModel)]="selectedSong" (change)="onSongChange($event)">
      <option *ngFor="let song of songService.songs | async" [ngValue]="song">{{song.title}}</option>
    </select>

    `
  }
)
export class TabbyHeaderComponent {

  selectedSong: Song = null;

  constructor(public songService: SongService) {
    songService.selectedSong.subscribe((value: Song) => {
      this.selectedSong = value;
    });
  }

  onSongChange(event: Event): void {
    this.songService.setSelectedSong(this.selectedSong);
  }
}

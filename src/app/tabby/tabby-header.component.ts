import {Component} from '@angular/core';
import {Song} from '../shared/song';

import {List} from 'immutable';
import {PlayerService} from '../shared/player.service';
import {Instrument, Tuning} from '../shared/tabsounds';
import {Speed} from '../shared/tabmusic';



@Component(
  {
    selector: 'app-tabby-header',
    styles: [`
      .container {
        align-items: flex-end;
        display: flex;
        justify-content: left;
      }

    `],

    template: `
  <div class="container">
    <div>
       <img src="assets/img/tabby_cat.png" alt="image" width="78" height="78">
    </div>
    <div>
      <select class="form-control" name="song" [(ngModel)]="selectedSong" (change)="onSongChange($event)">
        <option *ngFor="let song of songs " [ngValue]="song">{{song.title}}</option>
      </select>
      <select class="form-control" name="instrument" [(ngModel)]="selectedInstrument" (change)="onInstrumentChange($event)">
        <option *ngFor="let instrument of instruments" [ngValue]="instrument">{{instrument.name}}</option>
      </select>
      <select class="form-control" name="tuning" [(ngModel)]="selectedTuning" (change)="onTuningChange($event)">
        <option *ngFor="let tuning of playerService.music.tunings" [ngValue]="tuning">{{tuning.name}}</option>
      </select>
      <select class="form-control" name="speed" [(ngModel)]="selectedSpeed" (change)="onSpeedChange($event)">
        <option *ngFor="let speed of playerService.music.speeds" [ngValue]="speed">{{speed.name}}</option>
      </select>
    </div>
  </div>`
  }
)
export class TabbyHeaderComponent {

  selectedSong: Song = null;
  songs: List<Song>;

  selectedInstrument: Instrument = null;
  instruments: List<Instrument>;

  selectedTuning: Tuning = null;
  selectedSpeed: Speed = null;

  constructor(public playerService: PlayerService) {

    // on external changes..update user interface
    playerService.music.song$.subscribe((value: Song) => {
      this.selectedSong = value;
    });

    playerService.music.instrument$.subscribe((value: Instrument) => {
      this.selectedInstrument = value;
    });

    playerService.music.tuning$.subscribe((value: Tuning) => {
      this.selectedTuning = value;
    });

    playerService.music.speed$.subscribe((value: Speed) => {
      this.selectedSpeed = value;
    });

    playerService.songDb.songs$.subscribe((value: List<Song>) => {
      this.songs = value;
    });

    playerService.instrumentDb.instruments$.subscribe( (value: List<Instrument>) => {
      this.instruments = value;
    });
  }

  onSongChange(event: Event): void {
    // on user interface changes..update the service
    this.playerService.setSelectedSong(this.selectedSong);
  }

  onInstrumentChange(event: Event): void {
    // on user interface changes..update the service
    this.playerService.setSelectedInstrument(this.selectedInstrument);
  }

  onTuningChange(event: Event): void {
    // on user interface changes..update the service
    this.playerService.setSelectedTuning(this.selectedTuning);
  }

  onSpeedChange(event: Event): void {
    // on user interface changes..update the service
    this.playerService.setSelectedSpeed(this.selectedSpeed);
  }
}

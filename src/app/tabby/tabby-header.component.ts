import {Component} from '@angular/core';
import {Song} from '../shared/song';

import {List} from 'immutable';
import {PlayerService} from '../shared/player.service';
import {Instrument} from "../shared/tabsounds";
import {Speed} from "../shared/tabmusic";



@Component(
  {
    selector: 'app-tabby-header',
    template: `

    <img src="assets/img/tabby_cat.png" alt="image" width="75" height="75">

    <select class="form-control" name="song" [(ngModel)]="selectedSong" (change)="onSongChange($event)">
      <option *ngFor="let song of songs " [ngValue]="song">{{song.title}}</option>
    </select>
    <select class="form-control" name="instrument" [(ngModel)]="selectedInstrument" (change)="onInstrumentChange($event)">
      <option *ngFor="let instrument of instruments" [ngValue]="instrument">{{instrument.getName()}}</option>
    </select>
    <select class="form-control" name="speed" [(ngModel)]="selectedSpeed" (change)="onSpeedChange($event)">
      <option *ngFor="let speed of playerService.music.getSpeeds()" [ngValue]="speed">{{speed.getName()}}</option>
    </select>  
    `
  }
)
export class TabbyHeaderComponent {

  selectedSong: Song = null;
  songs: List<Song>;

  selectedInstrument: Instrument = null;
  instruments: List<Instrument>;

  selectedSpeed: Speed = null;

  constructor(public playerService: PlayerService) {

    // on external changes..update user interface
    playerService.music.song$.subscribe((value: Song) => {
      this.selectedSong = value;
    });

    playerService.songDb.songs$.subscribe((value: List<Song>) => {
      this.songs = value;
    });

    // on external changes..update user interface
    playerService.music.instrument$.subscribe((value: Instrument) => {
      this.selectedInstrument = value;
    });

    playerService.instrumentDb.instruments$.subscribe( (value: List<Instrument>) => {
      this.instruments = value;
    });


    // on external changes..update user interface
    playerService.music.speed$.subscribe((value: Speed) => {
      console.log("foo")
      this.selectedSpeed = value;
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

  onSpeedChange(event: Event): void {

    console.log("bar");
    // on user interface changes..update the service
    this.playerService.setSelectedSpeed(this.selectedSpeed);
  }
}
